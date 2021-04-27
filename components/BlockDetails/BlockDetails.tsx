import React from 'react'

export interface BlockDetailsProps {
  prevBlock: string
  blockIndex: number
  size: number
}

export default function BlockDetails({
  prevBlock,
  blockIndex,
  size,
}: BlockDetailsProps) {
  return (
    <table className="w-full shadow-md">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Parameter
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Value
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="text-sm text-gray-500">
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Size
          </th>
          <td className="px-6 py-4 whitespace-nowrap">{size}</td>
        </tr>
        <tr className="text-sm text-gray-500">
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Block index
          </th>
          <td className="px-6 py-4 whitespace-nowrap">{blockIndex}</td>
        </tr>
        <tr className="text-sm text-gray-500">
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Previous hash
          </th>
          <td className="px-6 py-4 whitespace-nowrap">{prevBlock}</td>
        </tr>
      </tbody>
    </table>
  )
}
