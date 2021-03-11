import React from 'react';
import {
    ThemeProvider,
} from "@material-ui/core";

import { theme } from "../theme";

const BlankLayout = ({children}: any) => {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default BlankLayout