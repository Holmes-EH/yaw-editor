import React, { ReactElement, useState } from 'react'
import parse from 'html-react-parser'
import { IContentBlock } from './interfaces'

import { BiBold, BiItalic, BiUnderline } from 'react-icons/bi'

interface ISelectedTextNode {
  text: string
  focusNode: Element | null
}

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
  const [selectedTextNode, setSelectedTextNode] = useState<ISelectedTextNode | null>(null)
  const [textIsSelected, setTextIsSelected] = useState<boolean>(false)
  const [styleToolbarPositionX, setStyleToolbarPositionX] = useState(0)
  const [styleToolbarPositionY, setStyleToolbarPositionY] = useState(0)

  const updateState = (text: string | null): void => {
    if (text !== null && text.length > 0) {
      setText(text)
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
      // TODO: MUST sanitize here
      updateState(e.currentTarget.innerHTML)
    },
  }

  const textSelected = (e: React.MouseEvent) => {
    const selection = document.getSelection()

    if (selection === null || selection.toString().length === 0) {
      setSelectedTextNode(null)
      setTextIsSelected(false)
      return
    }
    setStyleToolbarPositionX(e.nativeEvent.offsetX)
    setStyleToolbarPositionY(e.nativeEvent.offsetY - 20)
    setSelectedTextNode({ text: selection.toString(), focusNode: selection.focusNode as Element })
    setTextIsSelected(true)
  }

  const styleText = (type: string) => {
    const textToTransform = block.data.text
    if (
      selectedTextNode === null ||
      selectedTextNode.focusNode === null ||
      selectedTextNode.text === null ||
      textToTransform === undefined
    ) {
      return
    }
    let blockNewText: string | undefined
    const parentNode = selectedTextNode.focusNode.parentNode
    if (parentNode === undefined || parentNode === null) return

    if (parentNode.nodeName !== 'P' && parentNode.nodeName !== 'LI') {
      const parents: Element[] = []
      const getParentNodes = (node: Element) => {
        if (node.parentNode === null) return
        if (node.parentNode.nodeName !== 'P' && node.parentElement) {
          parents.push(node.parentElement)
          getParentNodes(node.parentElement)
        }
      }
      getParentNodes(selectedTextNode.focusNode)
      const typeIsInParents =
        parents.filter((parent) => parent.nodeName.toLowerCase() === type).length > 0
      if (typeIsInParents) {
        const tagRegexp = new RegExp(`</?${type}>`, 'g')
        blockNewText = textToTransform.replace(
          parents[parents.length - 1].outerHTML,
          parents[parents.length - 1].outerHTML.replace(tagRegexp, ''),
        )
      } else {
        blockNewText = textToTransform.replace(
          selectedTextNode.text,
          `<${type}>${selectedTextNode.text}</${type}>`,
        )
      }
    }
    if (parentNode.nodeName === 'P' || parentNode.nodeName === 'LI') {
      blockNewText = textToTransform.replace(
        selectedTextNode.text,
        `<${type}>${selectedTextNode.text}</${type}>`,
      )
    }

    if (blockNewText === undefined) return
    setText(blockNewText)
    setTextIsSelected(false)
    updateBlocks({ index: blockIndex, text: blockNewText })
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
      return (
        <>
          {textIsSelected && (
            <div
              className="text-style-toolbar"
              style={{ left: styleToolbarPositionX, top: styleToolbarPositionY }}
            >
              <BiBold onClick={() => styleText('strong')} />
              <BiItalic onClick={() => styleText('em')} />
              <BiUnderline onClick={() => styleText('u')} />
            </div>
          )}
          <p {...editableBlockProps} onMouseUp={(e: React.MouseEvent) => textSelected(e)}>
            {parse(block.data.text || '')}
          </p>
        </>
      )
  }
}

export default EditableBlockData
