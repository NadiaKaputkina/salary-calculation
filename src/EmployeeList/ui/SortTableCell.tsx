import React from 'react'
import { TableCell, TableSortLabel, withStyles } from "@material-ui/core";

// export type HeaderCellIds = {
//     name: string,
//     duty: string,
//     salary: number,
//     kids: number,
//     id: number
// }

export type HeaderCellIds = 'name' | 'duty' | 'salary' | 'kids' | 'id'

export type Order = 'asc' | 'desc';

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

    const {sort, orderBy, handleRequestSort, name, label} = props;

    const createSortHandler = (name: HeaderCellIds) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, name);
    }

    return (
        <StyledTableCell align="right">
            <TableSortLabel
                active={orderBy === name}
                direction={orderBy === name ? sort : 'asc'}
                onClick={createSortHandler(name)}
            />
            {label}
        </StyledTableCell>
    )
}


export default SortTableCell