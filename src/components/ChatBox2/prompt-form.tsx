import * as React from 'react'
import { Link } from '@umijs/max'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from './ai'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'

export interface PromptProps
    extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({
    onSubmit,
    input,
    setInput,
    isLoading
}: PromptProps) {
    const { formRef, onKeyDown } = useEnterSubmit()
    const inputRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <form
            onSubmit={async e => {
                e.preventDefault()
                if (!input?.trim()) {
                    return
                }
                setInput('')
                await onSubmit(input)
            }}
            ref={formRef}
        >


            <div className="w-96 relative bg-white flex max-h-60 grow flex-col overflow-hidden bg-background  sm:rounded-md sm:border">
                <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Send a message."
                    spellCheck={false}
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                />
                <div className="absolute right-0 top-4 sm:right-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || input === ''}
                            >
                                <IconArrowElbow />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </form>
    )
}
