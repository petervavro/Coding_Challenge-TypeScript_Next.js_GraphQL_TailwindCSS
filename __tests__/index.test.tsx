import React from 'react'
import Blocks, { BlocksQuery } from '../pages/index'
import * as GetBlocksTypes from '../__generated__/GetBlocks'
import { cache } from '@_apollo/cache'

import { renderApollo, cleanup, waitFor, fireEvent } from '../test-utils'

type itemsType = Omit<GetBlocksTypes.GetBlocks_blocks_items, '__typename'>[]

jest.mock('@components/Loading', () => {
  return function DummyLoading() {
    return 'LOADING'
  }
})

jest.mock('@components/ListBlocks', () => {
  return function DummyListBlock({ items = [] }: { items: itemsType }) {
    return <div data-testid="list-block">{JSON.stringify(items)}</div>
  }
})

describe('Blocks Page', () => {
  beforeEach(() => {
    // Reset cache
    cache.reset()
    jest.resetModules()
  })

  const items: itemsType = [
    {
      hash: 'a',
      time: 1,
      height: 2,
    },
  ]

  const addItems: itemsType = [
    {
      hash: 'b',
      time: 3,
      height: 4,
    },
  ]

  // Automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup)

  it('renders blocks', async () => {
    const mocks = [
      {
        request: {
          query: BlocksQuery,
          variables: { pageSize: 10, after: undefined },
        },
        result: {
          data: {
            blocks: {
              items,
              cursor: 'lastId',
              hasMore: true,
            },
          },
        },
      },
      {
        request: {
          query: BlocksQuery,
          variables: { pageSize: 10, after: 'lastId' },
        },
        result: {
          data: {
            blocks: {
              items: addItems,
              cursor: '',
              hasMore: false,
            },
          },
        },
      },
    ]

    const { getByText, getByTestId } = await renderApollo(<Blocks />, {
      mocks,
      cache,
    })

    // Check if "loading" indicator appears while data being loaded
    expect(getByText('LOADING')).toBeInTheDocument()

    // Check Apollo passes data to component
    await waitFor(() => {
      expect(getByTestId('list-block').textContent).toMatch(
        JSON.stringify(items)
      )
    })

    // Click on 'LOAD MORE' button
    fireEvent.click(getByText('LOAD MORE'))

    await waitFor(() => getByTestId('list-block'))

    // Check if it did load more items
    expect(getByTestId('list-block').textContent).toMatch(
      JSON.stringify([...items, ...addItems])
    )
  })

  test('load more button should be hidden', async () => {
    const mocks = [
      {
        request: {
          query: BlocksQuery,
          variables: { pageSize: 10 },
        },
        result: {
          data: {
            blocks: {
              items,
              cursor: null,
              hasMore: false,
            },
          },
        },
      },
    ]

    const { getByTestId, queryByText } = await renderApollo(<Blocks />, {
      mocks,
      cache,
    })

    await waitFor(() => getByTestId('list-block'))

    // Now there are mo more items to be loaded, so 'LOAD MORE' button should be hidden
    expect(queryByText('LOAD MORE')).toBeNull()
  })

  it('should display network error', async () => {
    const mocks = [
      {
        request: {
          query: BlocksQuery,
          variables: { pageSize: 10 },
        },
        error: new Error('An error occurred'),
      },
    ]

    const { getByText } = await renderApollo(<Blocks />, {
      mocks,
      cache,
    })

    await waitFor(() =>
      expect(getByText('An error occurred')).toBeInTheDocument()
    )
  })
})
