/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBlockDetails
// ====================================================

export interface GetBlockDetails_block {
  __typename: "Block";
  height: number;
  hash: string;
  time: number;
  prevBlock: string;
  blockIndex: number;
  size: number;
}

export interface GetBlockDetails {
  block: GetBlockDetails_block;
}

export interface GetBlockDetailsVariables {
  hash: string;
}
