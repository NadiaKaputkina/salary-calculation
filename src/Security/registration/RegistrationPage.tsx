import React from 'react';
import RegistrationForm from "../../shared/components/logoutForm/registrationForm";
import { useHistory } from "react-router-dom";
import BlankLayout from "../../layouts/BlankLayout";

export default function RegistrationPage() {

    let history = useHistory()

    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        showPassword: false,
    });

    return (
        <BlankLayout>
            <RegistrationForm
                values={values}
                setValues={setValues}
                history={history}
            />
        </BlankLayout>
    )
}