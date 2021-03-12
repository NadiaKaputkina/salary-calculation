import React from 'react'
import MainLayout from "../../layouts/MainLayout";
import {
    TableCell,
    withStyles,
    makeStyles,
    Paper,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableHead,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name: string, duty: string, salary: number, kids: number) {
    return { name, duty, salary, kids };
}

const rows = [
    createData('Дмитрий Сташинский', "Программист", 500, 3),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Employees() {
    const classes = useStyles();
    return (
        <MainLayout>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Сотруники</StyledTableCell>
                            <StyledTableCell align="right">Должность&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Олад&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Несовершеннолетне дети&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.duty}</StyledTableCell>
                                <StyledTableCell align="right">{row.salary}</StyledTableCell>
                                <StyledTableCell align="right">{row.kids}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainLayout>
    )
}