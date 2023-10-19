import { Resolvers } from '@/__generated__/resolvers-types';

const resolvers: Resolvers = {
    Query: {
        getBlock: async (
            _source,
            { blockHash },
            { dataSources }
        ) => {
            const { blocksAPI } = dataSources || {}

            return blocksAPI && blocksAPI.getBlock(blockHash || '');
        },
        getBlocks: async (
            _source,
            { dt },
            { dataSources }
        ) => {
            const { blocksAPI } = dataSources || {}

            return blocksAPI && blocksAPI.getBlocks(new Date(dt));
        },
    },
};

export default resolvers