import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Transaction {
    hash: String
    blockIndex: Int
    blockHeight: Int
  }

  type TransactionsWithPagination {
    cursor: String!
    hasMore: Boolean!
    items: [Transaction!]!
  }

  type Block {
    hash: String!
    time: Int!
    height: Int!
    size: Int!
    blockIndex: Int!
    prevBlock: String!
    transactions: TransactionsWithPagination!
  }

  type BlocksForPagination {
    cursor: String!
    hasMore: Boolean!
    items: [Block!]!
  }

  type Query {
    blocks(pageSize: Int, after: String): BlocksForPagination!
    block(hash: String!): Block!
    transactions(
      hash: String!
      pageSize: Int
      after: String
    ): TransactionsWithPagination!
  }
`
