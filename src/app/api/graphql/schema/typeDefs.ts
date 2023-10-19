import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    getBlock(blockHash: String): Block!
    getBlocks(dt: String): [Block!]!
  }

  type Block {
    hash: String
    height: Int
    time: Int
    block_index: Int
  }
`;

export default typeDefs