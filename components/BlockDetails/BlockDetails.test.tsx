import React from 'react'
import { render } from '@testing-library/react'
import BlockDetails from './index'
import { nanoid } from 'nanoid'

describe('Block detail', () => {
  test('all input data are displayed', () => {
    const prevBlock = nanoid()
    const blockIndex = 12345
    const size = 54321

    const { getByText } = render(
      <BlockDetails {...{ prevBlock, blockIndex, size }} />
    )

    // Get "prevBlock"
    expect(getByText(prevBlock)).toBeInTheDocument()

    // Get "blockIndex"
    expect(getByText(blockIndex)).toBeInTheDocument()

    // Get "size"
    expect(getByText(size)).toBeInTheDocument()
  })
})
