import React from 'react'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

const OrderOptions = ({
  blockIndex,
  moveBlock,
}: {
  blockIndex: number
  moveBlock: ({ direction, blockIndex }: { direction: 'UP' | 'DOWN'; blockIndex: number }) => void
}) => {
  return (
    <>
      <div className={`option-element`} onClick={() => moveBlock({ direction: 'UP', blockIndex })}>
        <BiUpArrowAlt /> Move up
      </div>
      <div
        className={`option-element`}
        onClick={() => moveBlock({ direction: 'DOWN', blockIndex })}
      >
        <BiDownArrowAlt /> Move down
      </div>
    </>
  )
}

export default OrderOptions
