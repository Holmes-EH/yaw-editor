import React, { ReactElement } from 'react'
import { BiHeading, BiParagraph, BiImage, BiListUl } from 'react-icons/bi'
import { ContentBlockType } from './interfaces'

const Toolbar = ({
  addNewBlock,
  toolBarIconSize,
}: {
  addNewBlock: (type: ContentBlockType) => void
  toolBarIconSize?: string
}): ReactElement => {
  return (
    <div className="yaw-toolbar">
      <button onClick={() => addNewBlock('header')} style={{ fontSize: toolBarIconSize }}>
        <BiHeading />
      </button>
      <button onClick={() => addNewBlock('paragraph')} style={{ fontSize: toolBarIconSize }}>
        <BiParagraph />
      </button>
      <button onClick={() => addNewBlock('image')} style={{ fontSize: toolBarIconSize }}>
        <BiImage />
      </button>
      <button onClick={() => addNewBlock('list')} style={{ fontSize: toolBarIconSize }}>
        <BiListUl />
      </button>
    </div>
  )
}

export default Toolbar
