
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:3000/api/graphql',
    // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        },
        './src/__generated__/resolvers-types.ts': {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                useIndexSignature: true,
                contextType: "../app/api/graphql/route#MyContext"
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;