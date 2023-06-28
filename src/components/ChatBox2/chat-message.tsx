import { Message } from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { MemoizedReactMarkdown } from '@/components/Markdown/index';
import { CodeBlock } from '@/components/ui/codeblock';
import { IconOpenAI, IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { ChatMessageActions } from './chat-message-actions';
import { Avatar } from "antd";
import { useMemo } from 'react';
import { getFormatTime } from '@/utils/utils';

export interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {

    const time = message?.time;
    // 格式化消息时间
    const formatTime = useMemo(() => getFormatTime(time), [time]);

    const isUserMessage = message.role === 'user';

    const messageContainerClassName = cn(
        'group relative mb-4 flex items-start',
        isUserMessage && 'md:flex-row-reverse',
    );

    const renderMessageText = () => {
        const containerClassName = `p-4 rounded-lg ${isUserMessage
            ? 'text-white bg-blue-500 border border-blue-500'
            : 'bg-gray-100 border border-gray-300'
            }`;
        return (
            <div className={containerClassName}>
                <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    <MemoizedReactMarkdown
                        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        components={{
                            p({ children }) {
                                return (
                                    <p
                                        className={`mb-2 last:mb-0 ${isUserMessage ? 'text-right' : 'text-left'
                                            }`}
                                    >
                                        {children}
                                    </p>
                                );
                            },
                            code({ node, inline, className, children, ...props }) {
                                if (children.length) {
                                    if (children[0] == '▍') {
                                        return (
                                            <span className="mt-1 animate-pulse cursor-default">
                                                ▍
                                            </span>
                                        );
                                    }

                                    children[0] = (children[0] as string).replace('`▍`', '▍');
                                }

                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }

                                return (
                                    <CodeBlock
                                        key={Math.random()}
                                        language={(match && match[1]) || ''}
                                        value={String(children).replace(/\n$/, '')}
                                        {...props}
                                    />
                                );
                            },
                        }}
                    >
                        {message.content}
                    </MemoizedReactMarkdown>
                    <ChatMessageActions message={message} />
                </div>
            </div>
        );
    };


    const getUserAvatar = () => {
        if (message.avatar === '') {
            return <IconUser />
        }
        return <Avatar src={message.avatar} />
    }

    const getAiAvatar = () => {
        if (message.avatar === '') {
            return <IconOpenAI />
        }
        return <Avatar src={message.avatar} />
    }

    return (
        <div>
            <div className={cn("flex items-start ml-10 mb-2", isUserMessage && 'md:flex-row-reverse mr-10')}>
                <div className="flex justify-center">
                    <div className="text-xs text-gray-500 mt-1">
                        {formatTime}
                    </div>
                </div>
            </div>

            <div className={messageContainerClassName} {...props}>
                <div
                    className={cn(
                        'flex h-8 w-8 shrink-0 select-none items-center justify-center',
                        isUserMessage ? 'ml-2' : 'mr-2',
                    )}
                >
                    {isUserMessage ? getUserAvatar() : getAiAvatar()}
                </div>
                <div>{renderMessageText()}</div>
            </div>
        </div>
    );
}
