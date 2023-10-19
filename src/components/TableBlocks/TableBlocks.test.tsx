import { render, screen, within } from '@testing-library/react'
import TableBlocks, { GET_BLOCKS_QUERY } from './index'
import { MockedProvider } from "@apollo/client/testing";

const DT = "2023-10-19T20:38:02.130Z"
const mocks = [
    {
        delay: 30,
        request: {
            query: GET_BLOCKS_QUERY,
            variables: {
                dt: DT
            }
        },
        result: {
            data: {
                getBlocks: [
                    { hash: 'abcdef', height: 1, time: 2, block_index: 3 },
                    { hash: 'fedcba', height: 4, time: 5, block_index: 6 },
                ]
            }
        }
    }
];

it('should render component without error', async () => {

    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <TableBlocks dt={DT} />
        </MockedProvider>
    )

    expect(screen.getAllByRole('rowgroup')).toHaveLength(2)
    expect(screen.getAllByRole('row')[0]).toHaveAccessibleName('Hash Height Time Actions')
    expect(await screen.findAllByText("Loading...")).toHaveLength(1)
    expect(await screen.findAllByRole('row')).toHaveLength(3)

    const firstBodyRow = screen.getAllByRole('row')[1]
    expect(firstBodyRow).toHaveAccessibleName('abcdef')

    expect(
        await within(firstBodyRow).findByRole('rowheader')
    ).toHaveTextContent('abcdef')

    const gridcells = await within(firstBodyRow).findAllByRole('gridcell')

    expect(gridcells[0]).toHaveTextContent('1')
    expect(gridcells[1]).toHaveTextContent('2')

    expect(
        within(gridcells[2]).getByRole('button')
    ).toHaveAccessibleName('Details')
})