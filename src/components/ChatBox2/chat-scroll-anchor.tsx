import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtBottom } from '@/lib/hooks/use-at-bottom';

interface ChatScrollAnchorProps {
    trackVisibility?: boolean;
    onScrollToTop?: () => void;
    onScrollToBottom?: () => void;
}

const ChatScrollAnchor: React.FC<ChatScrollAnchorProps> = ({
    trackVisibility,
    onScrollToTop,
    onScrollToBottom,
}) => {
    const isAtBottom = useAtBottom();
    const [isAtTop, setIsAtTop] = useState(false);
    const { ref, entry, inView } = useInView({
        trackVisibility,
        delay: 100,
        rootMargin: '-100px 0px 0px 0px',
    });

    useEffect(() => {
        setIsAtTop(!inView);
    }, [inView]);

    useEffect(() => {
        if (isAtTop && onScrollToTop) {
            onScrollToTop();
        }
    }, [isAtTop, onScrollToTop]);

    useEffect(() => {
        if (isAtBottom && onScrollToBottom) {
            onScrollToBottom();
        }
    }, [isAtBottom, onScrollToBottom]);

    useEffect(() => {
        if (isAtBottom && trackVisibility && !inView) {
            entry?.target.scrollIntoView({
                block: 'end',
            });
        }
    }, [isAtBottom, trackVisibility, inView, entry]);

    return <div id="chat-ai-scroll" ref={ref} className="h-px w-full" />;
};

export default ChatScrollAnchor;
