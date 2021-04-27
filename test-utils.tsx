import React from 'react'
import { render } from '@testing-library/react'
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { DefaultOptions, ApolloCache, Resolvers } from '@apollo/client'

type RenderApolloOptions = {
  mocks?: MockedResponse[]
  addTypename?: boolean | undefined
  defaultOptions?: DefaultOptions
  cache?: ApolloCache<Record<string, unknown>> | undefined
  resolvers?: Resolvers
  [st: string]: unknown
}

const renderApollo = (
  node: unknown,
  {
    mocks,
    addTypename,
    defaultOptions,
    cache,
    resolvers,
    ...options
  }: RenderApolloOptions = {}
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options
  )
}

export * from '@testing-library/react'
export { renderApollo }
