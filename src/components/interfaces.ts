import React, { FocusEventHandler, FormEventHandler, ReactHTMLElement } from 'react'

export interface IContent {
  time: number
  version: string
  blocks: IContentBlock[]
}
export interface IContentBlock {
  id: string
  type: ContentBlockType
  data: IContentBlockData
  style?: React.CSSProperties
}
export type ContentBlockType = 'header' | 'paragraph' | 'image' | 'list' | 'quote'

export interface IContentBlockData {
  text?: string
  level?: number
  style?: string
  items?: IContentBlockDataItem[]
  caption?: string
  url?: string
  alt?: string
}

export interface IContentBlockDataItem {
  id: string
  text: string
}

export interface IHtmlOutput extends ReactHTMLElement<HTMLElement> {
  className?: string
  contentEditable?: boolean
  suppressContentEditableWarning?: boolean
  onBlur?: FocusEventHandler
  onInput?: FormEventHandler
}
