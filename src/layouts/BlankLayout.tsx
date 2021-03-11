import React from 'react';
import {
    ThemeProvider,
} from "@material-ui/core";

import { theme } from "../theme";
import { useAppBarStyles } from "../shared/styles/rootStyles";
import clsx from "clsx";

const BlankLayout = ({children}: any) => {
    const classes = useAppBarStyles();
    return (
        <ThemeProvider theme={theme}>
            <div
                className={clsx(classes.layout, classes.height)}>
                {children}
            </div>
        </ThemeProvider>
    )
}

export default BlankLayout