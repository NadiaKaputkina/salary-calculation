import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";

import { theme } from "../../theme";
import LoginForm from "../../shared/components/loginForm/loginForm";
import RegistrationForm from "../../shared/components/logoutForm/logoutForm";

const useStyles = makeStyles(() => ({
    loginForm: {
        paddingLeft: '8px',
        marginBottom: '8px',
        height: '20%',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'floralwhite',
        borderRadius: '8px',
        border: '1px solid black',
    },
    loginLayout: {
        padding: '16px',
        height: '300px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flexStart',
        backgroundColor: 'cornflowerblue',
        borderRadius: '16px',
        border: '1px solid black',
    },
    label: {
        paddingLeft: '8px',
    },
    loginButtonLayout: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
}))

function LoginPage(props: any) {

    const {
        history
    } = props

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const [regButtonClicked, setRegButtonClicked] = useState(false)
    const dispatch = useDispatch();

    return (
        <ThemeProvider theme={theme}>
            {
                !regButtonClicked ?
                    <LoginForm
                        setRegButtonClicked={setRegButtonClicked}
                        values={values}
                        setValues={setValues}
                        history={history}
                    /> :
                    <RegistrationForm
                        setRegButtonClicked={setRegButtonClicked}
                        values={values}
                        setValues={setValues}
                        history={history}
                    />
            }
        </ThemeProvider>
    )
}

export default LoginPage