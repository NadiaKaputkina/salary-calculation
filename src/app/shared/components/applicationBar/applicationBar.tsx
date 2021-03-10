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
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileAuth } from "../../../../flux/selector/profile";
import { loginLogoutService } from "../../../../flux/actions/profile";

function ApplicationBar(props: any) {

    const {
        history
    } = props

    const auth = useSelector(selectProfileAuth)
    const dispatch = useDispatch();

    const handleLoginButton = () => {
        history.push('/login')
    };
    const handleLogoutButton = () => {
        dispatch(loginLogoutService({authenticated: false}))
        history.push('login')
    }

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
                {
                    auth ?
                        <Button
                            onClick={handleLogoutButton}
                        >
                            Logout
                        </Button> :
                        <Button
                            onClick={handleLoginButton}
                        >
                            Login
                        </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(ApplicationBar)