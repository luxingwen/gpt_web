import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import './index.less'
import TitleRow from './components/TitleRow';
import { queryHotQuestion } from '@/service/ai-chat'
import Question from './components/Question';


// 临时数据
const titleList: Array<ITitleCard> = [
    { id: '1', text: '全部' }, { id: '2', text: '热门' }, { id: '3', text: '职业' },
    { id: '4', text: '编程' }, { id: '5', text: '内容创作' }, { id: '6', text: '文案' },
    { id: '7', text: '热门' }, { id: '8', text: '职业' }, { id: '9', text: '变成' },
    { id: '10', text: '内容创作' }, { id: '11', text: '文案' }
]

const SumData = 6238



const HotQuestionPage = () => {

    const [selectType, setSelectType] = useState<string>('')

    const [questionList, setQuestionList] = useState<Array<IQuestion>>([])
    const [questionSumNum, setQuestionSumNum] = useState(SumData)
    const [isLoading, setIsLoading] = useState(false)

    const back2Question = (data: Array<IAiQuestionBack>): Array<IQuestion> => {
        const ret: IQuestion[] = []
        data.forEach(item => {
            ret.push({ id: String(item.id), title: item.title, question: item.question })
        });
        return ret
    }

    const loadingData = async () => {
        setIsLoading(true)
        await queryHotQuestion().then((res) => {
            const data = back2Question(res.data)
            setQuestionList(data)
        })
        setIsLoading(false)
    }

    useEffect(() => {
        loadingData()
    }, [])


    const handleChangeSelect = (id: string) => {
        setSelectType(id)
    }


    return (
        <PageContainer title={false}>
            <div className='qa-page'>
                {/* <TitleRow data={titleList} changeCallBack={handleChangeSelect}></TitleRow> */}
                <Question data={questionList} sumNum={questionSumNum} />
            </div>
        </PageContainer>

    )
}

export default HotQuestionPage