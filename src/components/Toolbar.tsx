import React, { ReactElement, useState } from 'react'
import { BiHeading, BiParagraph, BiImage, BiListUl, BiListOl } from 'react-icons/bi'
import { ContentBlockType, IContentBlockData } from './interfaces'

const Toolbar = ({
  addNewBlock,
  toolBarIconSize,
}: {
  addNewBlock: (type: ContentBlockType, data?: IContentBlockData) => void
  toolBarIconSize?: string
}): ReactElement => {
  const [isHeaderBlock, setIsHeaderBlock] = useState(false)
  const [isListBlock, setIsListBlock] = useState(false)
  if (isHeaderBlock)
    return (
      <div className="yaw-toolbar">
        <button
          style={{ fontSize: toolBarIconSize }}
          onClick={() => addNewBlock('header', { text: 'Start typing..', level: 1 })}
        >
          <BiHeading />
          <b>1</b>
        </button>
        <button
          style={{ fontSize: toolBarIconSize }}
          onClick={() => addNewBlock('header', { text: 'Start typing..', level: 2 })}
        >
          <BiHeading />
          <b>2</b>
        </button>
        <button
          style={{ fontSize: toolBarIconSize }}
          onClick={() => addNewBlock('header', { text: 'Start typing..', level: 3 })}
        >
          <BiHeading />
          <b>3</b>
        </button>
        <button
          style={{ fontSize: toolBarIconSize }}
          onClick={() => addNewBlock('header', { text: 'Start typing..', level: 4 })}
        >
          <BiHeading />
          <b>4</b>
        </button>
        <button
          style={{ fontSize: toolBarIconSize }}
          onClick={() => addNewBlock('header', { text: 'Start typing..', level: 5 })}
        >
          <BiHeading />
          <b>5</b>
        </button>
      </div>
    )
  if (isListBlock)
    return (
      <div className="yaw-toolbar">
        <button
          onClick={() =>
            addNewBlock('list', {
              listType: 'ordered',
              items: [{ id: 'test', text: 'First list item...' }],
            })
          }
          style={{ fontSize: toolBarIconSize }}
        >
          <BiListOl />
        </button>
        <button
          onClick={() =>
            addNewBlock('list', {
              listType: 'unordered',
              items: [{ id: 'test', text: 'First list item...' }],
            })
          }
          style={{ fontSize: toolBarIconSize }}
        >
          <BiListUl />
        </button>
      </div>
    )

  return (
    <div className="yaw-toolbar">
      <button
        onClick={() => setIsHeaderBlock(!isHeaderBlock)}
        style={{ fontSize: toolBarIconSize }}
      >
        <BiHeading />
      </button>
      <button onClick={() => addNewBlock('paragraph')} style={{ fontSize: toolBarIconSize }}>
        <BiParagraph />
      </button>
      <button onClick={() => addNewBlock('image')} style={{ fontSize: toolBarIconSize }}>
        <BiImage />
      </button>
      <button onClick={() => setIsListBlock(!isListBlock)} style={{ fontSize: toolBarIconSize }}>
        <BiListUl />
      </button>
    </div>
  )
}

export default Toolbar
