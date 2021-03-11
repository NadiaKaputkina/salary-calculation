import React from 'react';
import {
    CssBaseline,
    ThemeProvider,
} from "@material-ui/core";

import { theme } from "../theme";
import ApplicationBar from "../shared/components/applicationBar/applicationBar";
import NavigationDrawer from "../shared/components/navigationDrawer/navigationDrawer";
import { useAppBarStyles } from "../shared/styles/rootStyles";

const MainLayout = ({children}: any) => {

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const classes = useAppBarStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline/>
                <ApplicationBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                />
                <NavigationDrawer
                    open={open}
                    handleDrawerClose={handleDrawerClose}
                />
                <div className={classes.layout}>
                    {children}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default MainLayout