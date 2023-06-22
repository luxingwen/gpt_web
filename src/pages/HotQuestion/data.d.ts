interface ITitleCard {
    id: string
    text: string
}

interface IQuestion {
    id: string
    title: string
    question: string
    tag?: string
}

interface IAiQuestionBack {
    id: number
    title: string
    question: string
    is_del: number
}