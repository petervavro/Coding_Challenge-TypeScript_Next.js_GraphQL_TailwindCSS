/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Block = {
  __typename?: 'Block';
  block_index?: Maybe<Scalars['Int']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getBlock: Block;
  getBlocks: Array<Block>;
};


export type QueryGetBlockArgs = {
  blockHash?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBlocksArgs = {
  dt: Scalars['String']['input'];
};

export type GetBlockQueryVariables = Exact<{
  blockHash?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBlockQuery = { __typename?: 'Query', getBlock: { __typename?: 'Block', hash?: string | null, height?: number | null, time?: number | null, block_index?: number | null } };

export type GetBlocksQueryVariables = Exact<{
  dt: Scalars['String']['input'];
}>;


export type GetBlocksQuery = { __typename?: 'Query', getBlocks: Array<{ __typename?: 'Block', hash?: string | null, height?: number | null, time?: number | null, block_index?: number | null }> };


export const GetBlockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockHash"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"blockHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockHash"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"block_index"}}]}}]}}]} as unknown as DocumentNode<GetBlockQuery, GetBlockQueryVariables>;
export const GetBlocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"block_index"}}]}}]}}]} as unknown as DocumentNode<GetBlocksQuery, GetBlocksQueryVariables>;