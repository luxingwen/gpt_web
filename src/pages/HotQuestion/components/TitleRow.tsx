import { Col, Row, Space } from 'antd'
import React, { useState } from 'react'


interface TitleCardProps {
    data: ITitleCard,
    isSelect: boolean,
    changeSelect: (id: string) => void
}

const TitleCard: React.FC<TitleCardProps> = ({ data, isSelect, changeSelect }) => {
    return (
        <>
            {isSelect ?
                <div className={`${'card'} ${'select'}`}>{data.text}</div> :
                <div className={`${'card'} ${'un-select'}`} onClick={() => { changeSelect(data.id) }}>{data.text}</div>
            }
        </>
    )
}




const getCalcRowList = (data: ITitleCard[], max: number) => {
    const num = data.length % max === 0 ? Math.floor(data.length / 8) : Math.floor(data.length / 8) + 1
    const ret = []
    for (let index = 0; index < num; index++) {
        ret.push(index)
    }
    return ret
}

interface TitleRowProps {
    data: Array<ITitleCard>
    changeCallBack: (id: string) => void
    max?: number
}

const TitleRow: React.FC<TitleRowProps> = ({ data, changeCallBack, max = 8 }) => {

    const [selectTitle, setSelectTitle] = useState<string>(data[0].id)

    const tempList = getCalcRowList(data, max)


    const changeSelectCallBack = (id: string) => {
        setSelectTitle(id)
        changeCallBack(id)
    }

    return (
        <div className='title-row'>
            <Space direction='vertical' size={10}>
                {tempList.map(item => {
                    const thisData = data.slice(item * max, (item + 1) * max)


                    return <Row key={'row' + item} gutter={17}>
                        {thisData.map((item, index, _) => (
                            <Col key={item.id}>
                                <div>
                                    <TitleCard data={item} isSelect={item.id == selectTitle} changeSelect={changeSelectCallBack} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                }
                )}
            </Space>
        </div>
    )
}

export default TitleRow