import { paginateResults } from './utils'
import { DataSources } from '@pages/api/graphql'

export const resolvers = {
  Query: {
    blocks: async (
      _: unknown,
      { pageSize = 10, after }: { pageSize: number; after: string },
      { dataSources }: { dataSources: DataSources }
    ) => {
      const allBlocks = await dataSources.blockchainAPI.getAllBlocks()

      const blocks = paginateResults({
        after,
        pageSize,
        results: allBlocks,
      })

      return {
        items: blocks,
        cursor: blocks.length ? blocks[blocks.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: blocks.length
          ? blocks[blocks.length - 1].cursor !==
            allBlocks[allBlocks.length - 1].cursor
          : false,
      }
    },
    block: async (
      _: unknown,
      { hash }: { hash: string },
      { dataSources }: { dataSources: DataSources }
    ) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        transactions,
        ...rest
      } = await dataSources.blockchainAPI.getBlockById({ hash })

      return rest
    },
    transactions: async (
      _: unknown,
      {
        hash,
        pageSize = 10,
        after,
      }: { hash: string; pageSize: number; after: string },
      { dataSources }: { dataSources: DataSources }
    ) => {
      // Get transactions from server
      const transactions = await dataSources.blockchainAPI.getAllTransactions({
        hash,
      })

      const txs = paginateResults({
        after,
        pageSize,
        results: transactions,
      })

      return {
        items: txs,
        cursor: txs.length ? txs[txs.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: txs.length
          ? txs[txs.length - 1].cursor !==
            transactions[transactions.length - 1].cursor
          : false,
      }
    },
  },
}
