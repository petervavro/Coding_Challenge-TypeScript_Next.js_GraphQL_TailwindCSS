const resolvers = {
    Query: {
        blocks: async (
            _source: any,
            { dt }: { dt: string },
            { dataSources: { blocksAPI } }: any
        ) => {
            return blocksAPI.getBlocks(new Date(dt));
        },
    },
};

export default resolvers