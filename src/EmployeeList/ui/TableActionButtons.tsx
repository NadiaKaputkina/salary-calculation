import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actionButtons: {
        display: 'flex',
        flexDirection: 'row'
    },
}));

const TableActionButtons = (props: any) => {

    const {
        handleAddEmployeeButton,
        handleAddRandomEmployeeButton
    } = props
    const classes = useStyles()


    return (
        <>
            <div
            className={classes.actionButtons}>
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

export default TableActionButtons

