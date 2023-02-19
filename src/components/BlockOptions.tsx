import React, { useEffect, useState } from 'react'
import { IContentBlock, IContentBlockData } from './interfaces'
import CenteringOptions from './options/CenteringOptions'
import HeaderOptions from './options/HeaderOptions'
import { BiTrash } from 'react-icons/bi'
import OrderOptions from './options/OrderOptions'

const BlockOptions = ({
  block,
  updateBlocks,
  blockIndex,
  deleteBlock,
  moveBlock,
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
  deleteBlock: (blockToDelete: IContentBlock) => void
  moveBlock: ({ direction, blockIndex }: { direction: 'UP' | 'DOWN'; blockIndex: number }) => void
}) => {
  const [blockStyle, setBlockStyle] = useState<React.CSSProperties>(
    block.style || { textAlign: 'left' },
  )
  const [headerBlockLevel, setHeaderBlockLevel] = useState<number>(block.data.level || 1)
  const [showCentering, setShowCentering] = useState<boolean>(false)

  useEffect(() => {
    updateBlocks({ index: blockIndex, style: blockStyle })
  }, [blockStyle])

  useEffect(() => {
    updateBlocks({ index: blockIndex, data: { ...block.data, level: headerBlockLevel } })
  }, [headerBlockLevel])

  if (block.type === 'paragraph') {
    return (
      <div className="options-toolbar" style={containerStyles}>
        <div
          className={`option-element ${showCentering ? 'active' : ''}`}
          onClick={() => setShowCentering(!showCentering)}
          style={{ justifyContent: 'center' }}
        >
          Alignment
        </div>
        {showCentering && <CenteringOptions block={block} setBlockStyle={setBlockStyle} />}
        <OrderOptions blockIndex={blockIndex} moveBlock={moveBlock} />
        <div className={`option-element delete`} onClick={() => deleteBlock(block)}>
          <BiTrash /> Delete
        </div>
      </div>
    )
  }
  if (block.type === 'header') {
    return (
      <div className="options-toolbar" style={containerStyles}>
        <HeaderOptions block={block} setHeaderBlockLevel={setHeaderBlockLevel} />
        <div
          className={`option-element ${showCentering ? 'active' : ''}`}
          onClick={() => setShowCentering(!showCentering)}
          style={{ justifyContent: 'center' }}
        >
          Alignment
        </div>
        {showCentering && <CenteringOptions block={block} setBlockStyle={setBlockStyle} />}
        <OrderOptions blockIndex={blockIndex} moveBlock={moveBlock} />

        <div className={`option-element delete`} onClick={() => deleteBlock(block)}>
          <BiTrash /> Delete
        </div>
      </div>
    )
  }

  return <div>BlockOptions</div>
}
export default BlockOptions

const containerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex',
  flexDirection: 'column',
  minWidth: 'fit-content',
  position: 'absolute',
  top: 0,
  right: '40px',
  padding: '5px',
  background: 'var(--dark)',
  border: '1px solid var(--white)',
  borderRadius: '5px',
  zIndex: '100',
}
