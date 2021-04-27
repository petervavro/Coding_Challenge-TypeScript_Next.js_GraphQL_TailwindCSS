import React from 'react'

export type TypeTransaction = {
  hash: string
  blockIndex: number | string
  blockHeight: number | string
}

interface ListTransactionsProps {
  items?: TypeTransaction[]
}

const ListTransactions = ({ items = [] }: ListTransactionsProps) => {
  return (
    <table className="w-full shadow">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            #
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Hash
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map(({ hash }, index) => (
          <tr key={hash} className="text-sm text-gray-500">
            <th className="px-6 py-4 text-gray-300">{index + 1}</th>
            <td className="px-6 py-4 text-gray-700">{hash}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListTransactions
