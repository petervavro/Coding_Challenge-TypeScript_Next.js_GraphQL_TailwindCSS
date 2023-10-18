"use client";

import React from "react";
import TableBlocks from '@/components/TableBlocks'

export const dynamic = "force-dynamic";

export default function Page() {

    const dt = new Date()

    return (
        <div className="container mx-auto p-6">
            <TableBlocks dt={dt.toISOString()} />
        </div>
    );
}