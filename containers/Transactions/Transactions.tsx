import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import * as GetTransactionsTypes from '../../__generated__/GetTransactions'
import Loading from '@components/Loading'
import ListTransactions, { TypeTransaction } from '@components/ListTransactions'

export const TransactionsQuery = gql`
  query GetTransactions($hash: String!, $pageSize: Int, $after: String) {
    transactions(hash: $hash, pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      items {
        hash
        blockIndex
        blockHeight
      }
    }
  }
`

const PAGE_SIZE = 10

type TransactionsProps = {
  hash: string
}

function Transactions({ hash }: TransactionsProps) {
  const { data: { transactions } = {}, loading, error, fetchMore } = useQuery<
    GetTransactionsTypes.GetTransactions,
    GetTransactionsTypes.GetTransactionsVariables
  >(TransactionsQuery, { variables: { hash, pageSize: PAGE_SIZE } })

  const [isLoadingMore, setIsLoadingMore] = useState(false)

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

  if (error || !transactions)
    return <p className="text-red-500">{error?.message}</p>

  const { items = [], cursor, hasMore } = transactions

  return (
    <>
      <ListTransactions items={items as TypeTransaction[]} />
      {hasMore && (
        <button
          type="button"
          className="w-full inline-flex items-center justify-center transition duration-200 ease-in-out bg-blue-100 px-4 py-2 text-xs font-semibold tracking-wider text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-3 active:bg-red-700 transition ease-in-out duration-150"
          disabled={isLoadingMore}
          onClick={async () => {
            setIsLoadingMore(true)
            await fetchMore({
              variables: {
                hash,
                pageSize: PAGE_SIZE,
                after: cursor,
              },
            })
            setIsLoadingMore(false)
          }}
        >
          {(!isLoadingMore && 'LOAD MORE') || <Loading />}
        </button>
      )}
    </>
  )
}

export default Transactions
