import { RESTDataSource } from 'apollo-datasource-rest'
import { DataSourceConfig } from 'apollo-datasource'

type Block = {
  hash: string
  time: number
  height: number
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

  blockReducer({
    height,
    hash,
    time,
  }: Block) {
    return {
      cursor: `${height}`,
      height,
      hash,
      time,
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
}

module.exports = BlockChainAPI
