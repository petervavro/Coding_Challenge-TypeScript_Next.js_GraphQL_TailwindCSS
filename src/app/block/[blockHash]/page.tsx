import Link from 'next/link'
import { Button } from "@nextui-org/react";
import BlockDetails from '@/components/BlockDetails';

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Block Details',
}

type Props = { params: { blockHash: string } }

export default async function Page({ params }: Props) {
  return (
    <div>
      <h2 className="text-gray-400 font-thin text-xl lg:text-3xl xl:text-5xl pb-6">Block Details</h2>
      <BlockDetails blockHash={params.blockHash} />
      <Button
        href="/"
        as={Link}
        color="primary"
        variant="bordered"
        className='mt-6'
      >
        <span className='rotate-180'>&#10141;</span>&nbsp;Latest blocks
      </Button>
    </div>
  );
}