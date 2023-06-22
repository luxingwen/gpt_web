import { Space } from 'antd'
import React, { useState } from 'react'

interface CheckHeaderProps {
  callback: (idx: number) => void
}

const CheckHeader: React.FC<CheckHeaderProps> = ({ callback }) => {

  const titleText: string[] = ['Email', '微信']

  const [selectIdx, setselectIdx] = useState<number>(0)

  const click = (idx: number) => {
    setselectIdx(idx)
    callback(idx)
  }

  return (
    <div className='check-header'>
      <Space size={24} direction={'horizontal'}>
        {titleText.map((item, idx, _) => (
          <div key={'div' + idx}>
            {selectIdx == idx ?
              <span className='select' key={'title' + idx}>{item}</span> :
              <span className='un-select' key={'title' + idx} onClick={() => { click(idx) }}>{item}</span>}
          </div>
        ))}
      </Space>
    </div>
  )
}

export default CheckHeader