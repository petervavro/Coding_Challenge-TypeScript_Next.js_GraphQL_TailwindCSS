import { ApolloServer } from 'apollo-server-micro'
import { schema } from '@_apollo/schema'

const BlockchainAPI = require('@_apollo/datasources/blockchain')

export type DataSources = {
  blockchainAPI: typeof BlockchainAPI
}

export const dataSources = (): DataSources => ({
  blockchainAPI: new BlockchainAPI(),
})

// https://stackoverflow.com/questions/64537328/next-js-graphql-context-is-empty-on-ssr-getserversideprops
export async function contextResolver(ctx: { dataSources?: DataSources } = {}) {
  ctx.dataSources = dataSources()

  return ctx
}

const apolloServer = new ApolloServer({
  schema,
  dataSources,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
