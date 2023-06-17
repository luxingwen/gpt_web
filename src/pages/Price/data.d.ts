interface IBuyInfo {
    title: string
    price: string
    priceUnit: string
    disablePrice: string
    hit: string
    buttonText: string
    isHot?: boolean
}

interface IHuaBei {
    num: number
    price: string
}


interface IPersonCard {
    title: string
    price: string
    priceUnit: string
    hit: Array<string>
    buttonText: string
    isHot: boolean
}