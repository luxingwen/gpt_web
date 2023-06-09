import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { type Message } from './ai';
import { ChatList } from './chat-list';
import { ChatPanel } from './chat-panel';
import ChatScrollAnchor from './chat-scroll-anchor';
import { getHistoryChatMessage, queryQuestion } from '@/service/api';
import { useRequest, useModel } from 'umi';
import { smartChatCompletions } from '@/service/smart-chat';
import { wssocket } from '@/utils/ws_socket';
import { message } from 'antd';
import { useScroll } from 'ahooks';
import { newChatSession } from '@/service/ai-chat';
import { history } from '@umijs/max';
import { useHistorySession } from '@/store/historysession';


const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: any[];
    session_id?: number;
    chat_type?: string;
    scene?: number; // 场景id  prompt-chat 时使用
    aiAvatar?: string;
    scene_uuids?: string[];
}


const TRYING_MSG = '正在努力思考...';
const END_MSG = '###### [END] ######';

export default function Chat({ id, initialMessages, className, chat_type, scene = 0, session_id = 0, aiAvatar = "", scene_uuids = [] }: ChatProps) {

    const { initialState } = useModel('@@initialState');
    const currentUser = initialState?.currentUser;
    const [messages, setMessages] = useState(initialMessages ?? []);

    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [isLoadAllMsg, setIsLoadAllMsg] = useState(false);
    const [isFirstInit, setIsFirstInit] = useState(true);
    const [historyQuery, setHistoryQuery] = useState({
        page: 0,
        per_page: 30,
        session_id: session_id,
        scene: scene,
    });

    const historyState = useHistorySession();

    const scroll = useScroll(document);


    useEffect(() => {
        if (scroll?.top === 0) {
            console.log('到顶了');
            scrollToTop();
        }
    }, [scroll]);


    const append = async (message: Message) => {

        const timestamp = new Date().getTime();
        const timestampInSeconds = Math.floor(new Date().getTime() / 1000);
        // const userMessage = {
        //     content: message.content,
        //     self: true,
        //     is_end: true,
        //     id: 'u-' + timestamp,
        //     msg_id: message.id,
        //     time: timestampInSeconds,
        //     avatar: currentUser.avatar,
        //     user_id: currentUser?.id,
        //     role: 'user',
        // };

        // const aiMessage = {
        //     content: TRYING_MSG,
        //     self: true,
        //     is_end: true,
        //     id: 'ai-' + timestamp,
        //     msg_id: message.id,
        //     time: timestampInSeconds,
        //     avatar: aiAvatar,
        //     user_id: currentUser?.id,
        //     role: 'assistant',
        // };

        // setMessages((messages) => [...messages, userMessage, aiMessage]);

        if (chat_type === 'ai-chat') {
            // const quessionRes = queryQuestion(question);
            const quessionRes = await queryQuestion(message.content)
            // 剩余次数不足，提示购买次数
            if (quessionRes.errno == 4002) {
                showBuyModal();
                return;
            }
            if (quessionRes.errno !== 0) {
                message.error(quessionRes.errmsg)
                return
            }
            hanedleRequestQuestion(quessionRes.data);
        }
        if (chat_type === 'prompt-chat') {
            const quessionRes = await queryQuestion(message.content, parseInt(scene))
            if (quessionRes.errno == 4002) {
                showBuyModal();
                return;
            }
            if (quessionRes.errno !== 0) {
                message.error(quessionRes.errmsg)
                return
            }
            hanedleRequestQuestion(quessionRes.data);
        }


        if (chat_type === 'smart-chat') {
            const quessionRes = await smartChatCompletions({ content: message.content, uuids: scene_uuids, session_id: parseInt(session_id) });
            if (quessionRes.errno !== 0) {
                return;
            }
            hanedleRequestQuestion(quessionRes.data);
        }
    };
    // 处理发送消息
    const hanedleRequestQuestion = async (question) => {
        console.log("question:", question);
        const userMessage = {
            content: question.question,
            self: true,
            is_end: true,
            id: 'u-' + question.id,
            msg_id: question.id,
            time: +new Date(),
            avatar: currentUser.avatar,
            user_id: currentUser?.id,
            time: + new Date(),
            role: 'user',
        };

        const aiMessage = {
            content: TRYING_MSG,
            self: true,
            is_end: true,
            id: 'ai-' + question.id,
            msg_id: question.id,
            time: +new Date(),
            avatar: aiAvatar,
            user_id: currentUser?.id,
            role: 'assistant',
        };

        if (messages.length === 0) {
            // 刷新历史会话
            historyState?.actions?.fetchHistorySessions();
        }
        setMessages((messages) => [...messages, userMessage, aiMessage]);

    };


    const showBuyModal = () => {
        Modal.info({
            title: '提示',
            content: (
                <div>
                    <p>剩余次数不足，请购买次数</p>
                </div>
            ),
            maskClosable: true,
            closable: true,
            cancelText: '取消',
            okText: '去购买',
            okButtonProps: {
                style: {
                    backgroundColor: '#4b64f3'
                }
            },

            onCancel() {
                console.log('取消');
            },
            onOk() {
                console.log('去购买');
            },
        });
        return;
    };


    useEffect(() => {
        wssocket.create(currentUser.id);
        wssocket.addHandler((msg) => {
            handleReceive(msg.response.data);
        });
    }, []);

    const handleReceive = (itemMsg) => {
        if (itemMsg.msg.includes(END_MSG)) {
            // setIsMsgEnd(true);
            return;
        }

        const msgId = 'ai-' + itemMsg.msg_id;
        // console.log("msgId:",msgId)
        setMessages((prevMessages) => {
            const updatedMessages = prevMessages.map((item) => {
                // console.log("item---->:",item);
                if (item.msg_id === itemMsg.msg_id && item.id === msgId) {
                    if (item.content === TRYING_MSG) {
                        item.content = '';
                    }
                    return {
                        ...item,
                        content: item.content + itemMsg.msg,
                        time: +new Date(),
                    };
                }
                return item;
            });
            console.log("updatedMessages:", updatedMessages)
            return updatedMessages;
        });
        scrollToBottom();
    };

    const reload = () => {
        setMessages([]);
        setIsLoading(true);
    };
    const stop = () => setIsLoading(false);

    const fetchHistoryChatMessage = async (params: any, isInit: any) => {
        if (isLoadAllMsg) {
            message.info('没有更多消息了');
            return;
        }

        const res = await getHistoryChatMessage(params);
        console.log('fetchHistoryChatMessage:', res);
        if (res.errno === 0) {
            if (res.data.data.length === 0) {
                setIsLoadAllMsg(true);
                return;
            }
            let msgList = [];
            res.data.data.forEach((item) => {
                msgList.unshift(
                    {
                        content: item.question,
                        self: true,
                        is_end: true,
                        id: 'u-' + item.id,
                        msg_id: item.id,
                        time: item.add_time,
                        avatar: currentUser.avatar,
                        user_id: item.user_id,
                        role: 'user',
                    },
                    {
                        content: item.answer,
                        self: false,
                        id: 'ai-' + item.id,
                        msg_id: item.id,
                        is_end: true,
                        time: item.create_time,
                        avatar: aiAvatar,
                        user_id: item.user_id,
                        role: 'assistant',
                    },
                );
            });
            console.log('msgList:', msgList);
            setMessages((prev) => [...msgList, ...prev]); // prepend the older messages to the start of the list

            if (isInit) {
                scrollToBottom();
            }
        }
    };

    useEffect(() => {

        setMessages(initialMessages ?? []);
        fetchHistoryChatMessage({
            page: 0,
            per_page: 10,
            session_id: session_id,
        }, true);

    }, [session_id, aiAvatar]);


    const scrollToBottom = () => {
        setTimeout(() => {
            document.querySelector('#chat-ai-scroll')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
    };


    const scrollToTop = () => {
        fetchHistoryChatMessage({
            page: historyQuery.page + 1,
            per_page: historyQuery.per_page,
            session_id: session_id,
        }, false);
        setHistoryQuery((prev) => ({ ...prev, page: prev.page + 1 }));
    };


    const newSession = async () => {
        newChatSession({
            chat_type: chat_type,
            scene_id: '' + scene,
        }).then((res) => {
            if (res.errno === 0) {
                if (chat_type === 'smart-chat') {
                    console.log('res.data.id:', res.data.id);
                    history.push(`/smart-ai/chat/c/${res.data.id}`);
                }

                if (chat_type === 'ai-chat') {
                    history.push(`/ai/qa/${res.data.id}`);
                }
            }
        });
    };

    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                <ChatList messages={messages} />
                <ChatScrollAnchor trackVisibility={isLoading} />
            </div>
            <ChatPanel
                id={id}
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
                newSession={newSession}
            />
        </>
    );
}
