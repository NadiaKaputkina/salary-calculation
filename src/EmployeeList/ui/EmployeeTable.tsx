import React from 'react'
import {
    TableCell,
    withStyles,
    makeStyles,
    Paper,
    InputBase,
    fade,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    Button,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from "react-router";

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


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    layout: {
        display: 'flex',
        flexDirection: 'column'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const EmployeeTable = (props: any) => {

    const {
        setSearchText,
        handleDeleteButton,
        handleAddEmployeeButton,
        handleAddRandomEmployeeButton,
        workers
    } = props
    const classes = useStyles()

    return (
        <>
            <div className={classes.layout}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                        onBlur={(event) => {
                            setSearchText(event.target.value)
                        }
                        }
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Сотруники</StyledTableCell>
                                <StyledTableCell align="right">Должность&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">Оклад&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">Несовершеннолетние дети&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">действия&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.workers?.map((row: any) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.duty}</StyledTableCell>
                                    <StyledTableCell align="right">{row.salary}</StyledTableCell>
                                    <StyledTableCell align="right">{row.kids}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={handleDeleteButton(row.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddEmployeeButton}
                >
                    Add employee
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRandomEmployeeButton}
                >
                    Add Random employees
                </Button>
            </div>
        </>
    )
}

export default EmployeeTable