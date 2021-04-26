import React from 'react'
import Link from 'next/link'

export type TypeBlock = {
  hash: string
  time: number | string
  height: number | string
}

interface ListBlocksProps {
  items?: TypeBlock[]
}

const ListBlocks = ({ items = [] }: ListBlocksProps) => {
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
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Height
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Time
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Detail</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items &&
          items.map(({ time = 0, hash = '', height = 0 }, index) => (
            <tr key={time} className="text-sm text-gray-500">
              <td className="px-6 py-4 text-gray-300">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-700">{hash}</td>
              <td className="px-6 py-4">{time}</td>
              <td className="px-6 py-4">{height}</td>
              <td className="px-6 py-4 text-right font-medium">
                <Link href={`/block/${hash}`}>
                  <a className="bg-blue-100 px-4 py-2 text-xs font-semibold tracking-wider text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Details
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ListBlocks
