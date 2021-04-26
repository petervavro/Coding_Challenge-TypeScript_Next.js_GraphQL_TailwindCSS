import { InMemoryCache, Reference } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blocks: {
          keyArgs: false,
          merge(existing, incoming) {
            let items: Reference[] = []
            if (existing && existing.items) {
              items = items.concat(existing.items)
            }
            if (incoming && incoming.items) {
              items = items.concat(incoming.items)
            }
            return {
              ...incoming,
              items,
            }
          },
        },
      },
    },
  },
})
