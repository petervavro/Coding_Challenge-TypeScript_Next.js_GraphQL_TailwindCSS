/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBlocks
// ====================================================

export interface GetBlocks_blocks_items {
  __typename: "Block";
  hash: string;
  time: number;
  height: number;
}

export interface GetBlocks_blocks {
  __typename: "BlocksForPagination";
  cursor: string;
  hasMore: boolean;
  items: GetBlocks_blocks_items[];
}

export interface GetBlocks {
  blocks: GetBlocks_blocks;
}

export interface GetBlocksVariables {
  pageSize?: number | null;
  after?: string | null;
}
