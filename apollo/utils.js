export const paginateResults = ({
  after: cursor,
  pageSize = 10,
  results,
  // Optional function to calculate an item's cursor
  getCursor = () => null,
}) => {
  // "pageSize" must be >= 1. Default = 20
  if (pageSize < 1) return []

  if (!cursor) return results.slice(0, pageSize)

  // Find index where to start
  const cursorIndex = results.findIndex((item) => {
    let itemCursor = item.cursor ? item.cursor : getCursor(item)

    // If there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize)
}
