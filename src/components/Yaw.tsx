import React, { ReactElement, useState } from 'react'
import { ContentBlockType, IContentBlock, IContentBlockData } from './interfaces'
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

  const addNewBlock = (type: ContentBlockType, data?: IContentBlockData): void => {
    setLocalBlocks([
      ...localBlocks,
      { id: generateId(), type, data: data || { text: 'Start typing..' } },
    ])
    setShowToolBar(false)
    setBlocks([...localBlocks])
  }

  const deleteBlock = (blockToDelete: IContentBlock): void => {
    const newLocalBlocks = localBlocks.filter((block) => block.id !== blockToDelete.id)
    setLocalBlocks(newLocalBlocks)
    setBlocks([...localBlocks])
  }

  const updateBlocks = ({
    index,
    text,
    style,
    data,
  }: {
    index: number
    text?: string
    style?: React.CSSProperties
    data?: IContentBlockData
  }): void => {
    if (text) {
      localBlocks[index].data.text = text
    }
    if (style) {
      localBlocks[index].style = style
    }
    if (data) {
      localBlocks[index].data = data
    }
    setLocalBlocks([...localBlocks])
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
              deleteBlock={deleteBlock}
              updateBlocks={updateBlocks}
              blockIndex={index}
              styleProps={{ width: '100%' }}
              toolBarIconSize={toolBarIconSize}
            />
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
