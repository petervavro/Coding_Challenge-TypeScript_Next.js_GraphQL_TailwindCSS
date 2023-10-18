import React from 'react'
import {
    useQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import { Spinner } from '@nextui-org/spinner';

const blocksQuery = gql`
    query Blocks($dt: String) {
        getBlocks(dt: $dt) {
            hash
            height
            time
            block_index
        }
    }
`;

type Props = { dt: string }

export default function TableBlocks({ dt }: Props) {
    const { loading, error, data } = useQuery<{ getBlocks: { hash: string; height: number; time: number; }[] }>(blocksQuery, {
        variables: {
            dt,
        },
        fetchPolicy: "cache-first"
    });

    const columns = [
        {
            key: 'hash',
            label: 'Hash'
        }, {
            key: 'height',
            label: 'Height'
        }, {
            key: 'time',
            label: 'Time'
        },
    ];

    if (error) return `Error! ${error.message}`;

    return (
        <Table aria-label="Example table with dynamic content" classNames={{
            table: "min-h-[420px]",
        }}>
            <TableHeader>
                {columns.map(({ key, label }) =>
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data?.getBlocks || []}
                isLoading={loading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(row) => (
                    <TableRow key={row.hash}>
                        {(columnKey) => (
                            <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}