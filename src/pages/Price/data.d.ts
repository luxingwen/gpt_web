interface IBuyInfo {
    id: string
    title: string
    price: string
    priceUnit?: string
    disablePrice?: string
    hit?: string
    buttonText?: string
    isHot?: boolean
}

interface IHuaBei {
    id: string
    num: number
    price: number
}


interface IPersonCard {
    id: string
    title: string
    price: string
    priceUnit: string
    hit?: Array<string>
    buttonText: string
    isHot?: boolean
}

interface IBackData {
    id: number
    actual_price: number
    chat_times: 6000
    draw_score: number
    is_del: number
    name: string
    price: number
    time_period: number
    title: string
    type: int
}