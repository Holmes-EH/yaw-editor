import React, { useEffect, useState } from 'react'
import { IContentBlock, IContentBlockData } from './interfaces'
import CenteringOptions from './options/CenteringOptions'
import HeaderOptions from './options/HeaderOptions'
import { BiTrash } from 'react-icons/bi'

const BlockOptions = ({
  block,
  updateBlocks,
  blockIndex,
  deleteBlock,
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
}) => {
  const [blockStyle, setBlockStyle] = useState<React.CSSProperties>(
    block.style || { textAlign: 'left' },
  )
  const [blockLevel, setBlockLevel] = useState<number>(block.data.level || 1)
  const [showCentering, setShowCentering] = useState<boolean>(false)
  const [showHeaderLevel, setShowHeaderLevel] = useState<boolean>(false)

  useEffect(() => {
    updateBlocks({ index: blockIndex, style: blockStyle })
  }, [blockStyle])

  useEffect(() => {
    updateBlocks({ index: blockIndex, data: { ...block.data, level: blockLevel } })
  }, [blockLevel])

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
        <div className={`option-element delete`} onClick={() => deleteBlock(block)}>
          <BiTrash /> Delete
        </div>
      </div>
    )
  }
  if (block.type === 'header') {
    return (
      <div className="options-toolbar" style={containerStyles}>
        <HeaderOptions block={block} setBlockLevel={setBlockLevel} />
        <div
          className={`option-element ${showCentering ? 'active' : ''}`}
          onClick={() => setShowCentering(!showCentering)}
          style={{ justifyContent: 'center' }}
        >
          Alignment
        </div>
        {showCentering && <CenteringOptions block={block} setBlockStyle={setBlockStyle} />}
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
