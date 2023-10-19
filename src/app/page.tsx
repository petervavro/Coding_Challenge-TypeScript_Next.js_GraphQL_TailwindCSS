import React from "react";
import TableBlocks from '@/components/TableBlocks'
import ApolloWrapper from "@/providers/ApolloWrapper";

export const dynamic = "force-dynamic";

export const metadata = {
    title: 'Latest blocks',
}

export default function Page() {

    const dt = new Date()

    return (
        <ApolloWrapper>
            <h2 className="text-gray-400 font-thin text-xl lg:text-3xl xl:text-5xl pb-6">Latest blocks</h2>
            <TableBlocks dt={dt.toISOString()} />
        </ApolloWrapper>
    )
}