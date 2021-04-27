import React from 'react'
import { render } from '@testing-library/react'
import ListBlocks, { TypeBlock } from './index'
import { nanoid } from 'nanoid'

/**
 * To generate mock data
 * @param {number} amount
 * @returns
 */
export const renderMockTableData = (amount: number): TypeBlock[] => {
  const rows = []

  for (let i = 0; i < amount; i++) {
    rows.push({
      hash: nanoid(),
      time: nanoid(),
      height: nanoid(),
    })
  }

  return rows
}

describe('Blocks data', () => {
  test('all input data of items are displayed', () => {
    const data = renderMockTableData(20)

    const { getByText } = render(<ListBlocks items={data} />)

    // Traverse all values and confirm whether they are visible
    data.forEach((atts) => {
      Object.keys(atts).forEach((attName: string) => {
        expect(getByText(atts[attName as keyof TypeBlock])).toBeInTheDocument()
      })
    })
  })

  test('there must be button to details for every item', () => {
    const data = renderMockTableData(20)

    // Render
    const { queryAllByText } = render(<ListBlocks items={data} />)

    const buttons = queryAllByText('Details')

    // Check if amount is the same as amount of items
    expect(buttons).toHaveLength(20)

    // Check if all the buttons contain href attribute
    buttons.forEach((b) => {
      expect(b.getAttribute('href')).not.toBeNull()
    })

    // There should be one button for each item
    data.forEach(({ hash }) => {
      // Find button with link containing hash value of this item
      const foundButtons = buttons.filter(
        (b) => (b.getAttribute('href') ?? '').search(hash) > -1
      )

      expect(foundButtons).toHaveLength(1)
    })
  })
})
