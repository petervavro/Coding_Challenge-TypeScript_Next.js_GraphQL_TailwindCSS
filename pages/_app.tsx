import React from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <div className="container mx-auto py-6">
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
