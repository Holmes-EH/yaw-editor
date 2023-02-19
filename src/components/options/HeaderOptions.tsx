import React from 'react'
import { BiHeading } from 'react-icons/bi'
import { IContentBlock } from '../interfaces'

const HeaderOptions = ({
  block,
  setHeaderBlockLevel,
}: {
  block: IContentBlock
  setHeaderBlockLevel: (level: number) => void
}) => {
  return (
    <>
      <div
        className={`option-element ${block.data?.level === 1 ? 'active' : ''}`}
        onClick={() => setHeaderBlockLevel(1)}
        style={{ gap: '0px' }}
      >
        <BiHeading />
        <b>1</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 2 ? 'active' : ''}`}
        onClick={() => setHeaderBlockLevel(2)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>2</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 3 ? 'active' : ''}`}
        onClick={() => setHeaderBlockLevel(3)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>3</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 4 ? 'active' : ''}`}
        onClick={() => setHeaderBlockLevel(4)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>4</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 5 ? 'active' : ''}`}
        onClick={() => setHeaderBlockLevel(5)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>5</b>
      </div>
    </>
  )
}

export default HeaderOptions
