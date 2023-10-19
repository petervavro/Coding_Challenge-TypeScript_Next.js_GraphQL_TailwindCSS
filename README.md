# Coding Challenge - Web-based client for blockchain.info

- Technologies: TypeScript, GraphQL (Apollo Server and Client), Next.js, React, Node, Tailwind CSS

## Task
Create a web-based client for ​http://blockchain.info​ that allows users to list the latest blocks and details of each block. A block is just a data structure which groups transactions.

### The UI (frontend) component
Implement a frontend (e.g. React) that contains the following functionality:

- The first view (i.e. the landing screen) should display a list of blocks and the following details for each block:
  - Block hash
  - Block time
  - Block height

- A user should be able to click on each block and view the following details for the block:
  - Size
  - Block index
  - Previous hash

### The API component
To make your UI work you’ll need to provide an API to fetch the latest blocks and block details from blockchain.info.

- To get a list of blocks you can use the following API call:
  ```
  ➔ https://blockchain.info/blocks?format=json
  ```
  If for some reason this API call isn’t working (some people have reported issues with this API call), you can use the following API call as a workaround:
  ```
  ➔ https://blockchain.info/blocks/$time_in_milliseconds?format=json
  ```
  E.g.: [https://blockchain.info/blocks/1573858800000?format=json](https://blockchain.info/blocks/1573858800000?format=json), for the "time in milliseconds", you could just make this the previous day (or even configurable if you want to).

- To get the details for a block you can use the following API call:
  ```
  ➔ https://blockchain.info/rawblock/<block-hash>
  ```
  `<block-hash>` is the hash that is provided for each block in the previous call.
  For example: [https://blockchain.info/rawblock/0000000000000000001088de93437040aabd17df2b9ee3835dfe784f81f67e](https://blockchain.info/rawblock/0000000000000000001088de93437040aabd17df2b9ee3835dfe784f81f67e)

## Solution
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!