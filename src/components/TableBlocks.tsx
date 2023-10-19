"use client"

import React from 'react'
import Link from 'next/link'
import { Link as NextUILink } from "@nextui-org/react";
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
    TableCell
} from "@nextui-org/table";
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import EyeIcon from './EyeIcon'

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

type BlockType = { hash: string; height: number; time: number; }
type Props = { dt: string }

export default function TableBlocks({ dt }: Props) {
    const { loading, error, data } = useQuery<{ getBlocks: BlockType[] }>(blocksQuery, {
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
        {
            key: 'actions',
            label: 'Actions'
        },
    ];

    const renderCell = React.useCallback((
        item: BlockType,
        columnKey: keyof BlockType | 'actions'
    ) => {

        switch (columnKey) {
            case "hash":
                return (
                    <NextUILink href={`/block/${item.hash}`} as={Link}>
                        {item[columnKey]}
                    </NextUILink>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <Link href={`/block/${item.hash}`}>
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon />
                                </span>
                            </Link>
                        </Tooltip>
                    </div>
                );
            default:
                return item[columnKey]
        }
    }, []);

    if (error) return `Error! ${error.message}`;

    return (
        <Table
            aria-label="Blocks"
            classNames={{
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
                {(item) => (
                    <TableRow key={item.hash}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as keyof BlockType)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}