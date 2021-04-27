import React from 'react'
import { render } from '@testing-library/react'
import ListTransactions, { TypeTransaction } from './index'
import { nanoid } from 'nanoid'

/**
 * To generate mock data
 * @param {number} amount
 * @returns
 */
export const renderMockTableData = (amount: number) => {
  const rows = []

  for (let i = 0; i < amount; i++) {
    rows.push({
      hash: nanoid(),
    })
  }

  return rows
}

describe('Transactions data', () => {
  test('hash of all items must be displayed', () => {
    const data = renderMockTableData(20)

    const { getByText } = render(
      <ListTransactions items={data as TypeTransaction[]} />
    )

    // Traverse all values and confirm whether they are visible
    data.forEach(({ hash }) => {
      expect(getByText(hash)).toBeInTheDocument()
    })
  })
})
