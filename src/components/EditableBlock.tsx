import React, { ReactElement, useState } from 'react'

import { IContentBlock, IContentBlockData } from './interfaces'
import EditableBlockData from './EditableBlockData'
import BlockOptions from './BlockOptions'

import { HiXMark } from 'react-icons/hi2'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const EditableBlock = ({
  styleProps,
  block,
  deleteBlock,
  updateBlocks,
  moveBlock,
  blockIndex,
  toolBarIconSize,
}: {
  styleProps: React.CSSProperties
  block: IContentBlock
  deleteBlock: (blockToDelete: IContentBlock) => void
  updateBlocks: ({
    index,
    style,
    data,
  }: {
    index: number
    style?: React.CSSProperties
    data?: IContentBlockData
  }) => void
  moveBlock: ({ direction, blockIndex }: { direction: 'UP' | 'DOWN'; blockIndex: number }) => void
  blockIndex: number
  toolBarIconSize?: string
}): ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div
      className="blockContainer"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
      }}
    >
      <EditableBlockData
        styleProps={styleProps}
        block={block}
        key={block.id}
        updateBlocks={updateBlocks}
        blockIndex={blockIndex}
      />
      {showOptions && (
        <BlockOptions
          block={block}
          updateBlocks={updateBlocks}
          blockIndex={blockIndex}
          deleteBlock={deleteBlock}
          moveBlock={moveBlock}
        />
      )}
      <button
        onClick={() => {
          setShowOptions(!showOptions)
        }}
        style={{ border: 'none' }}
      >
        {showOptions ? (
          <HiXMark style={{ fontSize: toolBarIconSize }} />
        ) : (
          <BiDotsVerticalRounded style={{ fontSize: toolBarIconSize }} />
        )}
      </button>
    </div>
  )
}

export default EditableBlock
