import React from "react";
import {
    Button,
    DialogContentText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";

const EmployeeModal = (props: any) => {

    const {
        isWorkerModal,
        handleCloseAddWorkerModal,
        handleChange,
        handleAddWorkerModal,
    } = props

    return (
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
    )
}

export default EmployeeModal