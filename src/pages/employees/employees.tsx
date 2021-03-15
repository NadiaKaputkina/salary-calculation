import React, { useEffect, useState } from 'react'
import MainLayout from "../../layouts/MainLayout";
import {
    TableCell,
    withStyles,
    makeStyles,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    Button,
    DialogContentText, IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeAction, deleteEmployeeAction, loadWorkersAction } from "./employeesAction";
import { selectWorkers } from "./employeesSelector";
import { addRandomEmployeeAction } from "../../shared/utils/addRandomData";

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


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    layout: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default function Employees() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const workers = useSelector(selectWorkers)
    const [isWorkerModal, setIsAddWorkerModal] = useState(false)
    const [employee, setEmployee] = useState({
        name:'',
        duty:'',
        salary: 0,
        kids: 0
    })

    useEffect(() => {
        dispatch(loadWorkersAction())
    }, [isWorkerModal])

    const handleAddEmployeeButton = () => {
        setIsAddWorkerModal(true)
    }
    const handleCloseAddWorkerModal = () => {
        setIsAddWorkerModal(false)
    }
    const handleAddWorkerModal = () => {
        dispatch(addEmployeeAction(employee))
        setIsAddWorkerModal(false)
    }
    const handleChange = (prop: string) => (event: any) => {
        setEmployee({...employee, [prop]: event.target.value});
    };

    const handleDeleteButton = (id: number) => (event: any) =>{

        dispatch(deleteEmployeeAction(id))
    }

    const handleAddRandomEmployeeButton = () => {

        dispatch(addRandomEmployeeAction())
    }

    return (
        <MainLayout>
            <div className={classes.layout}>
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
                            {workers.workers?.map((row) => (
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
                                            <DeleteIcon />
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
            <Dialog open={isWorkerModal} onClose={handleCloseAddWorkerModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter new employee data
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        onChange={handleChange('name')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="duty"
                        label="Duty"
                        fullWidth
                        onChange={handleChange('duty')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Salary"
                        fullWidth
                        onChange={handleChange('salary')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="kids"
                        label="Kids"
                        fullWidth
                        onChange={handleChange('kids')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddWorkerModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddWorkerModal} color="primary">
                        Add worker
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    )
}