import React from 'react';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { useAppBarStyles } from "../../styles/rootStyles";

export default function ApplicationBar(props: any) {
    const classes = useAppBarStyles();
    return (
        <AppBar className={clsx(classes.appBar, props.open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={props.handleDrawerOpen}
                >
                    <MenuIcon/>
                </IconButton>
                <div className={classes.title}>
                    <NavLink to="/home" exact={true}>
                        <Typography>
                            Home
                        </Typography>
                    </NavLink>
                </div>
                <NavLink to="/login" exact={true}>
                    <Button>
                        Login
                    </Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    )
}