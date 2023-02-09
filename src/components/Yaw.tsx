import React, { ReactElement, useState } from 'react'
import { ContentBlockType, IContentBlock } from './interfaces'
import EditableBlock from './EditableBlock'
import { HiOutlinePlus, HiXMark } from 'react-icons/hi2'
import Toolbar from './Toolbar'

export const Yaw = ({
  className,
  blocks,
  setBlocks,
  style,
  toolBarIconSize,
}: {
  className?: string
  blocks: IContentBlock[]
  setBlocks: (blocks: IContentBlock[]) => void
  style?: React.CSSProperties
  toolBarIconSize?: string
}): ReactElement => {
  const [showToolBar, setShowToolBar] = useState<boolean>(false)
  const [localBlocks, setLocalBlocks] = useState<IContentBlock[]>([...blocks])

  const addNewBlock = (type: ContentBlockType): void => {
    setLocalBlocks([...localBlocks, { id: generateId(), type, data: { text: 'Start typing..' } }])
    setShowToolBar(false)
    setBlocks([...localBlocks])
  }

  const updateBlocks = (index: number, text: string): void => {
    localBlocks[index].data.text = text
    setLocalBlocks([...localBlocks])
    setBlocks([...localBlocks])
  }

  const deleteBlock = (blockToDelete: IContentBlock): void => {
    const newLocalBlocks = localBlocks.filter((block) => block.id !== blockToDelete.id)
    setLocalBlocks(newLocalBlocks)
    setBlocks([...localBlocks])
  }
  const generateId = () => {
    return Math.random().toString(36).substring(2, 12)
  }
  return (
    <div style={{ ...style }} className={className}>
      {localBlocks.map((block, index) => {
        return (
          <div
            key={block.id}
            className="blockContainer"
            style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <EditableBlock
              block={block}
              key={block.id}
              updateBlock={updateBlocks}
              blockIndex={index}
              styleProps={{ width: '100%' }}
            />
            <button
              onClick={() => {
                deleteBlock(block)
              }}
            >
              <HiXMark style={{ fontSize: toolBarIconSize }} />
            </button>
          </div>
        )
      })}
      {showToolBar && <Toolbar addNewBlock={addNewBlock} toolBarIconSize={toolBarIconSize} />}
      <button onClick={() => setShowToolBar(!showToolBar)}>
        {showToolBar ? (
          <HiXMark style={{ fontSize: toolBarIconSize }} />
        ) : (
          <HiOutlinePlus style={{ fontSize: toolBarIconSize }} />
        )}
      </button>
    </div>
  )
}
