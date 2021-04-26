import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Block {
    hash: String!
    time: Int!
    height: Int!
  }

  type BlocksForPagination {
    cursor: String!
    hasMore: Boolean!
    items: [Block!]!
  }

  type Query {
    blocks(pageSize: Int, after: String): BlocksForPagination!
  }
`
