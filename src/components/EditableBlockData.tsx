import React, { ReactElement, useState } from 'react'
import { IContentBlock } from './interfaces'

const EditableBlockData = ({
  styleProps,
  block,
  updateBlocks,
  blockIndex,
}: {
  styleProps: React.CSSProperties
  block: IContentBlock
  updateBlocks: ({
    index,
    text,
    style,
  }: {
    index: number
    text?: string
    style?: React.CSSProperties
  }) => void
  blockIndex: number
}): ReactElement => {
  const [text, setText] = useState<string>('')
  const updateState = (event: string | null): void => {
    if (event !== null && event.length > 0) {
      setText(event)
    }
  }

  const editableBlockProps: {
    style: React.CSSProperties
    contentEditable: boolean
    suppressContentEditableWarning: boolean
    onBlur: () => void
    onInput: (event: React.SyntheticEvent<HTMLElement>) => void
  } = {
    style: { ...styleProps, outline: 'none', whiteSpace: 'pre-line', ...block.style },
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: () => {
      if (text.length > 0) {
        updateBlocks({ index: blockIndex, text })
      }
    },
    onInput: (e) => {
      updateState(e.currentTarget.innerText)
    },
  }

  switch (block.type) {
    case 'header':
      switch (block.data.level) {
        case 1:
          return <h1 {...editableBlockProps}>{block.data.text}</h1>
        case 2:
          return <h2 {...editableBlockProps}>{block.data.text}</h2>
        case 3:
          return <h3 {...editableBlockProps}>{block.data.text}</h3>
        case 4:
          return <h4 {...editableBlockProps}>{block.data.text}</h4>
        default:
          return <h5 {...editableBlockProps}>{block.data.text}</h5>
      }
    default:
      return <p {...editableBlockProps}>{block.data.text}</p>
  }
}

export default EditableBlockData
