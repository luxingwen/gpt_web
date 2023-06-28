import { type UseChatHelpers } from './ai';

import { Button } from '@/components/ui/button';
import { IconStop } from '@/components/ui/icons';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import { FooterText } from './footer';
import { PromptForm } from './prompt-form';
import { useState } from 'react';
import { Modal } from 'antd';
import GroupQrcode from '@/assets/images/group-qrcode.png';

export interface ChatPanelProps
    extends Pick<
        UseChatHelpers,
        | 'append'
        | 'isLoading'
        | 'reload'
        | 'messages'
        | 'stop'
        | 'input'
        | 'setInput'
        | 'newSession'
    > {
    id?: string;
}

export function ChatPanel({
    id,
    isLoading,
    stop,
    append,
    reload,
    input,
    setInput,
    messages,
    newSession,
}: ChatPanelProps) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleJoinCommunity = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className="w-full flex justify-center h-auto">
            <div className="fixed w-full bottom-0">
                <ButtonScrollToBottom />
                <div className="mx-auto sm:max-w-4xl sm:px-4">
                    <div className="flex h-10 items-center justify-center">
                        {isLoading && (
                            <Button
                                variant="outline"
                                onClick={() => stop()}
                                className="bg-background"
                            >
                                <IconStop className="mr-2" />
                                停止生成
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4 border-t bg-white px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                        <TooltipProvider>
                            <div className="flex items-center"> {/* 修改的部分 */}
                                <div className="flex justify-center space-x-4 mr-1"> {/* 按钮组 */}
                                    <button
                                        onClick={newSession}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                    >
                                        新会话
                                    </button>
                                    <button
                                        onClick={handleJoinCommunity}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                    >
                                        加入社群
                                    </button>
                                </div>
                                <div className="flex-grow"> {/* PromptForm 左侧 */}
                                    <PromptForm
                                        onSubmit={async (value) => {
                                            await append({
                                                id,
                                                content: value,
                                                role: 'user',
                                            });
                                        }}
                                        input={input}
                                        setInput={setInput}
                                        isLoading={isLoading}
                                    />
                                </div>

                            </div>
                        </TooltipProvider>


                        <Modal
                            open={isModalVisible}
                            onCancel={handleModalCancel}
                            footer={null}
                            className="text-center"
                        >
                            <p className="text-lg font-semibold mb-4">
                                使用微信扫一扫加入社群
                            </p>
                            <img src={GroupQrcode} alt="Community Image" className="mx-auto" />
                        </Modal>


                        {/* <FooterText className="hidden sm:block" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
