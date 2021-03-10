import React from 'react';
import {
    Divider,
    Drawer,
    IconButton,
    List
} from "@material-ui/core";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Category from "../category/category";
import { useNavigationDrawerStyles } from "../../styles/rootStyles";

export default function NavigationDrawer(props: any) {
    const classes = useNavigationDrawerStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List
                className={classes.drawer}
            >
                <Category/>
            </List>
            <Divider/>
        </Drawer>
    )
}