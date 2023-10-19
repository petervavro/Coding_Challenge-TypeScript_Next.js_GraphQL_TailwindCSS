import React from 'react'
import { gql } from "@apollo/client";
import { getClient } from "@/providers/ApolloClient";
import { QueryGetBlockArgs } from '@/__generated__/graphql';

const GET_BLOCK_QUERY = gql(`
  query GetBlock($blockHash: String) {
    getBlock(blockHash: $blockHash) {
      hash
      height
      time
      block_index
    }
  }
`);

type Props = QueryGetBlockArgs

export default async function BlockDetails({ blockHash }: Props) {
    const { data: { getBlock } } = await getClient().query({
        query: GET_BLOCK_QUERY,
        variables: {
            blockHash
        }
    });

    const { hash, height, time, block_index } = getBlock

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                <div className="border-gray-600 md:border-b col-span-3 p-3">
                    <h6 className="text-xl font-bold lg:text-2xl xl:text-3xl">{hash}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                        Hash
                    </p>
                </div>
                <div className="border-gray-600 md:border-r p-3">
                    <h6 className="text-4xl font-bold lg:text-3xl xl:text-4xl">{height}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                        Height
                    </p>
                </div>
                <div className="border-gray-600 md:border-r p-3">
                    <h6 className="text-4xl font-bold lg:text-3xl xl:text-4xl">{time}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                        Time
                    </p>
                </div>
                <div className="p-3">
                    <h6 className="text-4xl font-bold lg:text-3xl xl:text-4xl">{block_index}</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                        Block index
                    </p>
                </div>
            </div>
        </div>
    )
}