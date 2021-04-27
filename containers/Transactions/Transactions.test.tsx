import React from 'react'
import Transactions, { TransactionsQuery } from './index'
import * as GetTransactionsTypes from '../../__generated__/GetTransactions'
import { cache } from '@_apollo/cache'

import { renderApollo, cleanup, waitFor, fireEvent } from '../../test-utils'

type itemsType = Omit<
  GetTransactionsTypes.GetTransactions_transactions_items,
  '__typename'
>[]

jest.mock('@components/Loading', () => {
  return function DummyLoading() {
    return 'LOADING'
  }
})

jest.mock('@components/ListTransactions', () => {
  return function DummyListTransactions({ items = [] }: { items: itemsType }) {
    return <div data-testid="list-transactions">{JSON.stringify(items)}</div>
  }
})

const BLOCK_HASH = 'abcde'

describe('Transactions', () => {
  beforeEach(() => {
    // Reset cache
    cache.reset()
    jest.resetModules()
  })

  const items: itemsType = [
    {
      hash: 'a',
      blockIndex: 1,
      blockHeight: 2,
    },
  ]

  const addItems: itemsType = [
    {
      hash: 'b',
      blockIndex: 3,
      blockHeight: 4,
    },
  ]

  // Automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup)

  it('renders transactions', async () => {
    const mocks = [
      {
        request: {
          query: TransactionsQuery,
          variables: { hash: BLOCK_HASH, pageSize: 10 },
        },
        result: {
          data: {
            transactions: {
              items,
              cursor: 'lastId',
              hasMore: true,
            },
          },
        },
      },
      {
        request: {
          query: TransactionsQuery,
          variables: { hash: BLOCK_HASH, pageSize: 10, after: 'lastId' },
        },
        result: {
          data: {
            transactions: {
              items: addItems,
              cursor: null,
              hasMore: false,
            },
          },
        },
      },
    ]

    const { getByText, getByTestId } = await renderApollo(
      <Transactions hash={BLOCK_HASH} />,
      {
        mocks,
        cache,
      }
    )

    // Check if "loading" indicator appears while data being loaded
    await waitFor(() => expect(getByText('LOADING')).toBeInTheDocument())

    await waitFor(() => getByTestId('list-transactions'))

    // Check Apollo passes data to component
    expect(getByTestId('list-transactions').textContent).toMatch(
      JSON.stringify(items)
    )

    // // Click on 'LOAD MORE' button
    fireEvent.click(getByText('LOAD MORE'))

    await waitFor(() => getByTestId('list-transactions'))

    // Check if it did load more items
    expect(getByTestId('list-transactions').textContent).toMatch(
      JSON.stringify([...items, ...addItems])
    )
  })

  test('load more button should be hidden', async () => {
    const mocks = [
      {
        request: {
          query: TransactionsQuery,
          variables: { hash: BLOCK_HASH, pageSize: 10 },
        },
        result: {
          data: {
            transactions: {
              items,
              cursor: null,
              hasMore: false,
            },
          },
        },
      },
    ]

    const { getByTestId, queryByText } = await renderApollo(
      <Transactions hash={BLOCK_HASH} />,
      {
        mocks,
        cache,
      }
    )

    await waitFor(() => getByTestId('list-transactions'))

    // Now there are mo more items to be loaded, so 'LOAD MORE' button should be hidden
    expect(queryByText('LOAD MORE')).toBeNull()
  })

  it('should display network error', async () => {
    const mocks = [
      {
        request: {
          query: TransactionsQuery,
          variables: { hash: BLOCK_HASH, pageSize: 10 },
        },
        error: new Error('An error occurred'),
      },
    ]

    const { getByText } = await renderApollo(
      <Transactions hash={BLOCK_HASH} />,
      {
        mocks,
        cache,
      }
    )

    await waitFor(() =>
      expect(getByText('An error occurred')).toBeInTheDocument()
    )
  })
})
