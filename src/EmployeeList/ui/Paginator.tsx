import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Paginator = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination count={10} showFirstButton showLastButton />
        </div>
    );
}

export default Paginator