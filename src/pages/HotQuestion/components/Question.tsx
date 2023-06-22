import { Pagination, Space } from 'antd'
import React, { useEffect } from 'react'



interface QuestionProps {
    sumNum: number,
    data: Array<IQuestion>
}
const Question: React.FC<QuestionProps> = ({ sumNum, data }) => {


    return (
        <div className='question'>
            <span className='q-sum'>问题{sumNum}</span>

            <div className='q-list'>
                {data.map(item => (
                    <div className='q-item' key={item.id}>
                        <span className='q-text'>{item.question}</span>
                        <span className='q-tag'>#热门 #编程 #数字人</span>
                    </div>
                ))}
            </div>

            <div className='pag'>
                <Pagination defaultCurrent={6} total={500} />
            </div>
        </div>
    )
}

export default Question