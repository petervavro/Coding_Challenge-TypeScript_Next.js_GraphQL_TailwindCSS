import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '@_apollo/client'
import * as GetBlocksTypes from '../__generated__/GetBlocks'
import { contextResolver } from '@pages/api/graphql'
import ListBlocks from '@components/ListBlocks'
import Loading from '@components/Loading'

export const BlocksQuery = gql`
  query GetBlocks($pageSize: Int, $after: String) {
    blocks(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      items {
        hash
        time
        height
      }
    }
  }
`

const PAGE_SIZE = 10

export default function Blocks() {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { data, loading, error, fetchMore } = useQuery<
    GetBlocksTypes.GetBlocks,
    GetBlocksTypes.GetBlocksVariables
  >(BlocksQuery, { variables: { pageSize: PAGE_SIZE } })

  if (loading)
    return (
      <div
        className={
          'w-full inline-flex items-center justify-center p-4 animate-fade-in-down'
        }
      >
        <Loading />
      </div>
    )

  if (error || !data) return <p className="text-red-500">{error?.message}</p>

  if (!data?.blocks?.items) return null

  const { items = [], cursor, hasMore } = data.blocks

  return (
    <>
      <h1 className="text-lg p-1">Blocks</h1>
      <ListBlocks items={items} />
      {hasMore && (
        <div className="flex justify-end p-3">
          <button
            className="w-full inline-flex items-center justify-center bg-blue-100 px-4 py-2 text-xs font-semibold tracking-wider text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoadingMore}
            onClick={async () => {
              setIsLoadingMore(true)
              await fetchMore({
                variables: {
                  pageSize: PAGE_SIZE,
                  after: cursor,
                },
              })
              setIsLoadingMore(false)
            }}
          >
            {(!isLoadingMore && 'LOAD MORE') || <Loading />}
          </button>
        </div>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<
  Record<string, unknown>,
  { hash: string }
> = async () => {
  const ctx = await contextResolver()

  const apolloClient = initializeApollo(null, ctx)

  await apolloClient.query({
    query: BlocksQuery,
    variables: { pageSize: PAGE_SIZE },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
