import React, { ReactElement, useState } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { IContentBlock, IContentBlockData, IContentBlockDataItem } from './interfaces'

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
    data,
    style,
  }: {
    index: number
    data: IContentBlockData
    style?: React.CSSProperties
  }) => void
  blockIndex: number
}): ReactElement => {
  const [text, setText] = useState<string>('')
  const [listItems, setListItems] = useState<IContentBlockDataItem[] | undefined>(block.data?.items)
  const [isEdited, setIsEdited] = useState(false)
  const [selectedTextNode, setSelectedTextNode] = useState<ISelectedTextNode | null>(null)
  const [textIsSelected, setTextIsSelected] = useState<boolean>(false)

  const editableBlockProps: {
    style: React.CSSProperties
    contentEditable: boolean
    suppressContentEditableWarning: boolean
    onKeyDown: (event: React.KeyboardEvent) => void
    onBlur: () => void
    onInput: (event: React.SyntheticEvent<HTMLElement>) => void
  } = {
    style: {
      ...styleProps,
      outline: 'none',
      ...block.style,
    },
    contentEditable: true,
    suppressContentEditableWarning: true,
    onKeyDown: (e) => {
      if (!isEdited) {
        setIsEdited(true)
      }
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          e.preventDefault()
          // execCommand has been flagged as obsolete for a while. Consensus seems to be that it will still be supported for a while. Must keep an eye on the evolution...
          document.execCommand('insertLineBreak')
          // A potential alternative..
          // const position = document.getSelection()?.getRangeAt(0)
          // position?.insertNode(document.createElement('br'))
          // document.getSelection()?.collapseToEnd()
          // setText(e.currentTarget.innerHTML)
          return
        }
      }
    },
    onBlur: () => {
      if (text.length) {
        updateBlocks({ index: blockIndex, data: { ...block.data, text } })
      }
    },
    onInput: (e) => {
      const sanitized = DOMPurify.sanitize(e.currentTarget.innerHTML, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ['strong', 'em', 'u', 'br'],
        FORBID_TAGS: ['div'],
      })
      setText(sanitized)
    },
  }

  const textSelected = () => {
    const selection = document.getSelection()

    if (selection === null || selection.isCollapsed) {
      setSelectedTextNode(null)
      setTextIsSelected(false)
      return
    }
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
    )
      return

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
    updateBlocks({ index: blockIndex, data: { ...block.data, text: blockNewText } })
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
    case 'list':
      switch (block.data.listType) {
        case 'ordered':
          return (
            <>
              {textIsSelected && (
                <div className="text-style-toolbar" style={{ left: '0%', top: '-15px' }}>
                  <BiBold onClick={() => styleText('strong')} />
                  <BiItalic onClick={() => styleText('em')} />
                  <BiUnderline onClick={() => styleText('u')} />
                </div>
              )}
              <ol
                key={block.id}
                {...editableBlockProps}
                onSelect={textSelected}
                onChange={(e) => setText(e.currentTarget.innerHTML)}
              >
                {listItems?.map((listItem) => {
                  return <li key={`li-${block.id}-${listItem.id}`}></li>
                })}
              </ol>
            </>
          )
        case 'unordered':
          return (
            <ul
              key={block.id}
              {...editableBlockProps}
              onSelect={textSelected}
              onChange={(e) => setText(e.currentTarget.innerHTML)}
            >
              {listItems?.map((listItem) => {
                return <li key={`li-${block.id}-${listItem.id}`}></li>
              })}
            </ul>
          )
        default:
          throw new Error("List block listType must be 'ordered' or 'unordered'")
      }
    default:
      return (
        <>
          {textIsSelected && (
            <div className="text-style-toolbar" style={{ left: '0%', top: '-15px' }}>
              <BiBold onClick={() => styleText('strong')} />
              <BiItalic onClick={() => styleText('em')} />
              <BiUnderline onClick={() => styleText('u')} />
            </div>
          )}
          <p
            {...editableBlockProps}
            onSelect={textSelected}
            dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
            onChange={(e) => setText(e.currentTarget.innerHTML)}
          ></p>
        </>
      )
  }
}

export default EditableBlockData
