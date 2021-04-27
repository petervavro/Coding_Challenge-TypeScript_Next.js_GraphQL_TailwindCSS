/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTransactions
// ====================================================

export interface GetTransactions_transactions_items {
  __typename: "Transaction";
  hash: string | null;
  blockIndex: number | null;
  blockHeight: number | null;
}

export interface GetTransactions_transactions {
  __typename: "TransactionsWithPagination";
  cursor: string;
  hasMore: boolean;
  items: GetTransactions_transactions_items[];
}

export interface GetTransactions {
  transactions: GetTransactions_transactions;
}

export interface GetTransactionsVariables {
  hash: string;
  pageSize?: number | null;
  after?: string | null;
}
