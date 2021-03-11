import React from 'react';
import {
    ThemeProvider,
} from "@material-ui/core";
import { theme } from "../../theme";
import RegistrationForm from "../../shared/components/logoutForm/registrationForm";
import { useHistory } from "react-router-dom";

export default function RegistrationPage() {

    let history = useHistory()

    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        showPassword: false,
    });

    return (
        <ThemeProvider theme={theme}>
            <RegistrationForm
                values={values}
                setValues={setValues}
                history={history}
            />
        </ThemeProvider>
    )
}