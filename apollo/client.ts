import { useMemo } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { cache } from './cache'
import { DataSources } from '@pages/api/graphql'

export type Context = {
  dataSources?: DataSources
}

let apolloClient: ApolloClient<NormalizedCacheObject>

function createIsomorphLink(context: Context = {}) {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')
    // BUG FIX:
    // https://tech.wayne-chu.com/archives/7075
    // https://stackoverflow.com/questions/64537328/next-js-graphql-context-is-empty-on-ssr-getserversideprops
    return new SchemaLink({ schema, context })
  } else {
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}

function createApolloClient(
  context?: Context
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache,
  })
}

export function initializeApollo(
  initialState: unknown = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: Context
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore(initialState as NormalizedCacheObject)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(
  initialState: unknown
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
