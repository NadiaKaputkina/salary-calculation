import React from 'react'
import { TableCell, TableSortLabel, withStyles } from "@material-ui/core";

// export type HeaderCellIds = {
//     name: string,
//     duty: string,
//     salary: number,
//     kids: number,
//     id: number
// }

export type HeaderCellIdsType = 'name' | 'duty' | 'salary' | 'kids' | 'id'

export type OrderType = 'asc' | 'desc' | null;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const SortTableCell = (props: any) => {

    const {
        queryParams: {sort, order},
        handleRequestSort,
        name,
        label
    } = props;

    // const createSortHandler = (name: HeaderCellIdsType, order: OrderType) => (event: React.MouseEvent<unknown>) => {
    //     handleRequestSort(event, name, order);
    // }

    return (
        <StyledTableCell
            align="right"
            onClick={handleRequestSort(name, order)}
        >
            {
                sort !== null &&
                (<TableSortLabel
                    active={sort === name}
                    direction={sort === name ? order : 'asc'}
                />)
            }
            {label}
        </StyledTableCell>
    )
}


export default SortTableCell