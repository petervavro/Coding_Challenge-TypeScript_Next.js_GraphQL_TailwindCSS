import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { RESTDataSource } from '@apollo/datasource-rest';
import { ApolloServer } from "@apollo/server";
import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers'

export class BlocksAPI extends RESTDataSource {
    override baseURL = 'https://blockchain.info/';

    async getBlock(blockHash: string) {
        return this.get(`rawblock/${encodeURIComponent(blockHash)}`);
    }

    async getBlocks(ts: Date) {
        const data = await this.get(`blocks/${+new Date(ts)}`, {
            params: {
                format: 'json'
            },
        });
        return data;
    }
}

export interface MyContext {
    dataSources?: {
        blocksAPI: BlocksAPI;
    };
}

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async () => {

        const { cache } = server;

        return {
            dataSources: {
                blocksAPI: new BlocksAPI({ cache }),
            },
        };
    },
});

export { handler as GET, handler as POST };