// TODO : make this function (better... then,) exportable as utility for Yaw lib

import React from 'react'
import { IContentBlock } from './interfaces'

const outputData = (block: IContentBlock) => {
  switch (block.type) {
    case 'header':
      switch (block.data.level) {
        case 1:
          return <h1 key={block.id}>{block.data.text}</h1>
        case 2:
          return <h2 key={block.id}>{block.data.text}</h2>
        case 3:
          return <h3 key={block.id}>{block.data.text}</h3>
        case 4:
          return <h4 key={block.id}>{block.data.text}</h4>
        case 5:
          return <h5 key={block.id}>{block.data.text}</h5>
        default:
          throw new Error('Header level must be specified')
      }
    case 'image':
      return <img key={block.id} src={block.data.url} alt={block.data.alt} />
    case 'list':
      switch (block.data.style) {
        case 'unordered':
          return (
            <ul key={block.id}>
              {block.data.items?.map((element) => {
                return <li key={`li-${block.id}-${element.id}`}>{element.text}</li>
              })}
            </ul>
          )
        case 'ordered':
          return (
            <ol key={block.id}>
              {block.data.items?.map((element) => {
                return <li key={`li-${block.id}${element.id}`}>{element.text}</li>
              })}
            </ol>
          )
        default:
          throw new Error('List block style must be specified')
      }
    case 'quote':
      return (
        <figure key={block.id}>
          <blockquote>
            <p>{block.data.text}</p>
          </blockquote>
          <figcaption>{block.data.caption}</figcaption>
        </figure>
      )

    default:
      return (
        <p key={block.id} className="text-justify">
          {block.data.text}
        </p>
      )
  }
}

export default outputData
