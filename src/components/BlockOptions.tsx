import React, { useEffect, useState } from 'react'
import { IContentBlock, IContentBlockData } from './interfaces'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiAlignJustify, BiHeading } from 'react-icons/bi'

const BlockOptions = ({
  block,
  updateBlocks,
  blockIndex,
}: {
  block: IContentBlock
  updateBlocks: ({
    index,
    text,
    style,
    data,
  }: {
    index: number
    text?: string
    style?: React.CSSProperties
    data?: IContentBlockData
  }) => void
  blockIndex: number
}) => {
  const [blockStyle, setBlockStyle] = useState<React.CSSProperties>(
    block.style || { textAlign: 'left' },
  )
  const [blockLevel, setBlockLevel] = useState<number>(block.data.level || 1)

  useEffect(() => {
    updateBlocks({ index: blockIndex, style: blockStyle })
  }, [blockStyle])

  useEffect(() => {
    updateBlocks({ index: blockIndex, data: { ...block.data, level: blockLevel } })
  }, [blockLevel])

  if (block.type === 'paragraph') {
    return (
      <div
        className="options-toolbar"
        style={{
          display: 'flex',
          justifyContent: 'flex',
          flexDirection: 'column',
          minWidth: 'fit-content',
          position: 'absolute',
          right: '40px',
          padding: '5px',
          background: 'var(--dark)',
          border: '1px solid var(--white)',
          borderRadius: '5px',
          zIndex: '100',
        }}
      >
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
      </div>
    )
  }
  if (block.type === 'header') {
    return (
      <div
        className="options-toolbar"
        style={{
          display: 'flex',
          justifyContent: 'flex',
          flexDirection: 'column',
          minWidth: 'fit-content',
          position: 'absolute',
          right: '40px',
          padding: '5px',
          background: 'var(--dark)',
          border: '1px solid var(--white)',
          borderRadius: '5px',
          zIndex: '100',
        }}
      >
        <div
          className={`option-element ${block.data?.level === 1 ? 'active' : ''}`}
          onClick={() => setBlockLevel(1)}
        >
          <BiHeading />
          <b>1</b>
        </div>
        <div
          className={`option-element ${block.data?.level === 2 ? 'active' : ''}`}
          onClick={() => setBlockLevel(2)}
        >
          <BiHeading />
          <b>2</b>
        </div>
        <div
          className={`option-element ${block.data?.level === 3 ? 'active' : ''}`}
          onClick={() => setBlockLevel(3)}
        >
          <BiHeading />
          <b>3</b>
        </div>
        <div
          className={`option-element ${block.data?.level === 4 ? 'active' : ''}`}
          onClick={() => setBlockLevel(4)}
        >
          <BiHeading />
          <b>4</b>
        </div>
        <div
          className={`option-element ${block.data?.level === 5 ? 'active' : ''}`}
          onClick={() => setBlockLevel(5)}
        >
          <BiHeading />
          <b>5</b>
        </div>
      </div>
    )
  }

  return <div>BlockOptions</div>
}
export default BlockOptions
