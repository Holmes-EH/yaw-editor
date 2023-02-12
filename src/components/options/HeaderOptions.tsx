import React from 'react'
import { BiHeading } from 'react-icons/bi'
import { IContentBlock } from '../interfaces'

const HeaderOptions = ({
  block,
  setBlockLevel,
}: {
  block: IContentBlock
  setBlockLevel: (level: number) => void
}) => {
  return (
    <>
      <div
        className={`option-element ${block.data?.level === 1 ? 'active' : ''}`}
        onClick={() => setBlockLevel(1)}
        style={{ gap: '0px' }}
      >
        <BiHeading />
        <b>1</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 2 ? 'active' : ''}`}
        onClick={() => setBlockLevel(2)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>2</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 3 ? 'active' : ''}`}
        onClick={() => setBlockLevel(3)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>3</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 4 ? 'active' : ''}`}
        onClick={() => setBlockLevel(4)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>4</b>
      </div>
      <div
        className={`option-element ${block.data?.level === 5 ? 'active' : ''}`}
        onClick={() => setBlockLevel(5)}
        style={{ gap: 'unset' }}
      >
        <BiHeading />
        <b>5</b>
      </div>
    </>
  )
}

export default HeaderOptions
