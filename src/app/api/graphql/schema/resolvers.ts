const resolvers = {
    Query: {
        getBlock: async (
            _source: any,
            { blockHash }: { blockHash: string },
            { dataSources: { blocksAPI } }: any
        ) => {
            return blocksAPI.getBlock(blockHash);
        },
        getBlocks: async (
            _source: any,
            { dt }: { dt: string },
            { dataSources: { blocksAPI } }: any
        ) => {
            return blocksAPI.getBlocks(new Date(dt));
        },
    },
};

export default resolvers