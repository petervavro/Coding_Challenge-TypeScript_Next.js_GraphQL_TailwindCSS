# Coding Challenge - Web-based client for blockchain.info

- Technologies: TypeScript, GraphQL (Apollo Server and Client), Next.js, React, Node, Tailwind CSS
- Author: Peter Vavro (peter@vavro.me)

## The Task:

Create a web-based client for ​http://blockchain.info​ that allows users to list the latest blocks and details of each block. A block is just a data structure which groups transactions.

The UI (frontend) component:

Implement a frontend (e.g. React) that contains the following functionality:

- The first view (i.e. the landing screen) should display a list of blocks and the following details for each block:

  - Block hash
  - Block time
  - Bock height
  - If you get some time you might want to implement pagination on the results.

- A user should be able to click on each block and view the following details for the block:
  - Size
  - Block index
  - Previous hash
  - If you get some time it would be great if you could also display the list of transactions for each block - you can decide on what details should be displayed.

### The API component:

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