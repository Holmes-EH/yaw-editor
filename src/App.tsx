import React, { useState } from 'react'
import { IContentBlock, Yaw } from './components'

function App() {
  const [blocks, setBlocks] = useState<IContentBlock[]>([
    {
      id: 'a-first-id-for-dummy-data',
      type: 'header',
      data: { level: 1, text: 'Welcome to YAW!' },
      style: { textAlign: 'center' },
    },
    {
      id: 'a-second-id-for-dummy-data',
      type: 'paragraph',
      data: {
        text: 'You can start by <u><em><strong>editing</strong></em></u> the <strong>3 existing blocks</strong>, or delete them...<br>And start adding your own...<br>With a new line...<br>With <strong>bold</strong>, <em>italic</em> or <u>underlined</u> text.. Maybe even <strong><em><u>all three</u></em></strong> at the same time ?',
      },
    },
    {
      id: 'a-third-id-for-dummy-data',
      type: 'paragraph',
      data: {
        text: 'You could also add a paragraph and center the text...',
      },
      style: { textAlign: 'center' },
    },
    {
      id: 'a-forth-id-for-dummy-data',
      type: 'paragraph',
      data: {
        text: 'With text <strong>aligned to the right</strong>... And checkout what you can do by clicking the block options ->',
      },
      style: { textAlign: 'right' },
    },
  ])

  return (
    <div style={{ padding: '0 5em' }}>
      <h1>Yaw Editor</h1>
      <Yaw
        className="yaw"
        blocks={blocks}
        setBlocks={setBlocks}
        toolBarIconSize="1.5em"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          outline: '1px solid white',
          borderRadius: '1em',
          padding: '1em 10px',
        }}
      />
    </div>
  )
}

export default App
