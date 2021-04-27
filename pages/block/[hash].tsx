import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import * as GetBlockDetailsTypes from '../../__generated__/GetBlockDetails'
import { initializeApollo } from '@_apollo/client'
import { contextResolver } from '@pages/api/graphql'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Loading from '@components/Loading'
import Transactions from '@containers/Transactions'
import BlockDetails from '@components/BlockDetails'

export const BlockDetailQuery = gql`
  query GetBlockDetails($hash: String!) {
    block(hash: $hash) {
      height
      hash
      time
      prevBlock
      blockIndex
      size
    }
  }
`

type BlockProps = {
  hash: string
}

export default function Block({ hash }: BlockProps) {
  const { data, loading, error } = useQuery<
    GetBlockDetailsTypes.GetBlockDetails,
    GetBlockDetailsTypes.GetBlockDetailsVariables
  >(BlockDetailQuery, {
    variables: { hash },
  })

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

  return (
    <>
      <h1 className="text-lg p-1">
        Block <b>{data.block.height}</b>
      </h1>
      <div className="flex flex-col md:justify-center my-3">
        <div>
          <h2 className="p-3">Details</h2>
          <BlockDetails {...data.block} />
        </div>
        <div>
          <h2 className="p-3">Block Transactions</h2>
          <Transactions hash={hash} />
        </div>
      </div>
      <div className="my-3 py-3 border-t border-gray-200">
        <Link href={`/`}>
          <a className="transition duration-200 ease-in-out bg-gray-200 px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            &#8592;&nbsp;Back to the list with blocks
          </a>
        </Link>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  Record<string, unknown>,
  { hash: string }
> = async (context = {}) => {
  const ctx = await contextResolver()

  await contextResolver(ctx)

  const apolloClient = initializeApollo(null, ctx)
  const { params } = context
  const { hash } = params || {}

  await apolloClient.query({
    query: BlockDetailQuery,
    variables: { hash },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      hash,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
