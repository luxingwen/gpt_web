import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { type Message } from './ai';
import { ChatList } from './chat-list';
import { ChatPanel } from './chat-panel';
import { ChatScrollAnchor } from './chat-scroll-anchor';
import { getHistoryChatMessage, queryQuestion } from '@/service/api';
import { useRequest, useModel } from 'umi';
import { smartChatCompletions } from '@/service/smart-chat';
import { wssocket } from '@/utils/ws_socket';


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

    const [historyQuery, setHistoryQuery] = useState({
        page: 0,
        per_page: 30,
        session_id: session_id,
        scene: scene,
    });

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
        setMessages((messages) => [...messages, userMessage, aiMessage]);
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
        console.log("itemMsg:", itemMsg)

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
    };

    const reload = () => {
        setMessages([]);
        setIsLoading(true);
    };
    const stop = () => setIsLoading(false);




    const fetchHistoryChatMessage = async (params: any) => {
        const res = await getHistoryChatMessage(params);
        console.log('fetchHistoryChatMessage:', res);
        if (res.errno === 0) {
            if (res.data.length === 0) {
                // setLoadAllMsg(true)
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
        }
    };






    useEffect(() => {
        console.log("aiAvatar:", aiAvatar);
        console.log('chat session_id:', session_id);
        setMessages(initialMessages ?? []);
        fetchHistoryChatMessage({
            page: 0,
            per_page: 10,
            session_id: session_id,
        })
    }, [session_id, aiAvatar]);


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
            />
        </>
    );
}
