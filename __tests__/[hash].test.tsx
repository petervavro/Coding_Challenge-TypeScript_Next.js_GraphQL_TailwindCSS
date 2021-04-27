import React from 'react'
import Block, { BlockDetailQuery } from '@pages/block/[hash]'
import * as GetBlockDetails from '../__generated__/GetBlockDetails'
import { cache } from '@_apollo/cache'
import { nanoid } from 'nanoid'
import { renderApollo, cleanup, waitFor } from '../test-utils'

jest.mock('@components/Loading', () => {
  return function DummyLoading() {
    return 'LOADING'
  }
})

jest.mock('@components/BlockDetails', () => {
  return function DummyBlockDetails({
    prevBlock,
    blockIndex,
    size,
    height,
    hash,
    time,
  }: GetBlockDetails.GetBlockDetails_block) {
    return (
      <div data-testid="block-details">
        {JSON.stringify({
          prevBlock,
          blockIndex,
          size,
          height,
          hash,
          time,
        })}
      </div>
    )
  }
})

const BLOCK_HASH = 'abcde'

describe('Blocks Page', () => {
  beforeEach(() => {
    // Reset cache
    cache.reset()
    jest.resetModules()
  })

  const blockMock = {
    prevBlock: nanoid(),
    blockIndex: 12345,
    size: 54321,
    height: 1,
    hash: nanoid(),
    time: 2,
  }

  // Automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup)

  it('renders block details', async () => {
    const mocks = [
      {
        request: {
          query: BlockDetailQuery,
          variables: { hash: BLOCK_HASH },
        },
        result: {
          data: {
            block: {
              ...blockMock,
            },
          },
        },
      },
    ]

    const { getByText, getByTestId } = await renderApollo(
      <Block hash={BLOCK_HASH} />,
      {
        mocks,
        cache,
      }
    )

    // Check if "loading" indicator appears while data being loaded
    expect(getByText('LOADING')).toBeInTheDocument()

    await waitFor(() => getByTestId('block-details'))

    // Check Apollo passes data to component
    expect(getByTestId('block-details').textContent).toMatch(
      JSON.stringify(blockMock)
    )
  })
})
