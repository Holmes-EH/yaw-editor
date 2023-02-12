import React from 'react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiAlignJustify } from 'react-icons/bi'
import { IContentBlock } from '../interfaces'

const CenteringOptions = ({
  block,
  setBlockStyle,
}: {
  block: IContentBlock
  setBlockStyle: (style: React.CSSProperties) => void
}) => {
  return (
    <>
      <div
        className={`option-element ${block.style?.textAlign === 'left' ? 'active' : ''}`}
        onClick={() => setBlockStyle({ textAlign: 'left' })}
      >
        <BiAlignLeft />
        Align left
      </div>
      <div
        className={`option-element ${block.style?.textAlign === 'center' ? 'active' : ''}`}
        onClick={() => setBlockStyle({ textAlign: 'center' })}
      >
        <BiAlignMiddle />
        Center
      </div>
      <div
        className={`option-element ${block.style?.textAlign === 'right' ? 'active' : ''}`}
        onClick={() => setBlockStyle({ textAlign: 'right' })}
      >
        <BiAlignRight />
        Align right
      </div>
      <div
        className={`option-element ${block.style?.textAlign === 'justify' ? 'active' : ''}`}
        onClick={() => setBlockStyle({ textAlign: 'justify' })}
      >
        <BiAlignJustify />
        Justify
      </div>
    </>
  )
}

export default CenteringOptions
