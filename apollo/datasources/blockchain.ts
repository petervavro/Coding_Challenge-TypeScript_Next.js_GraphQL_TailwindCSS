import { RESTDataSource } from 'apollo-datasource-rest'
import { DataSourceConfig } from 'apollo-datasource'

type Transaction = {
  hash: string
  block_index: number
  block_height: number
}

type Block = {
  height: number
  hash: string
  time: number
  main_chain: boolean
  prev_block: string
  block_index: number
  size: number
  tx: Transaction[]
}

class BlockChainAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://blockchain.info/'

    // BUG FIX for : "Error: Cannot read property 'fetch' of undefined"
    // This is happening when there is call from Next.js backend functions
    // found at https://github.com/apollographql/apollo-server/issues/3429
    this.initialize({} as DataSourceConfig<Record<string, unknown>>) // calling initialize() function with empty object is the key
  }

  transactionReducer({
    hash,
    block_index: blockIndex,
    block_height: blockHeight,
  }: Transaction) {
    return {
      cursor: `${hash}`,
      hash,
      blockIndex,
      blockHeight,
    }
  }

  blockReducer({
    height,
    hash,
    time,
    prev_block: prevBlock,
    block_index: blockIndex,
    size,
    tx,
  }: Block) {
    return {
      cursor: `${height}`,
      height,
      hash,
      time,
      prevBlock,
      blockIndex,
      size,
      ...(tx && {
        transactions: tx.map(this.transactionReducer),
      }),
    }
  }

  async getAllBlocks() {
    try {
      // https://www.blockchain.com/api/blockchain_api
      const response = await this.get('blocks?format=json')

      // Transform the raw blocks data
      return Array.isArray(response.blocks)
        ? response.blocks.map((block: Block) => this.blockReducer(block))
        : []
    } catch (error) {
      return []
    }
  }

  async getBlockById({ hash }: { hash: string }) {
    // https://www.blockchain.com/api/blockchain_api
    const response = await this.get(`rawblock/${hash}`)
    return this.blockReducer(response)
  }

  async getAllTransactions({ hash }: { hash: string }) {
    // https://www.blockchain.com/api/blockchain_api
    const response = await this.get(`rawblock/${hash}`)
    const { transactions = [] } = this.blockReducer(response)
    return transactions
  }
}

module.exports = BlockChainAPI
