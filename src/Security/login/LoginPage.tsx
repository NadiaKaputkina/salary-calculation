import React from 'react';
import { useHistory } from "react-router-dom";
import LoginForm from "../../shared/components/loginForm/loginForm";
import BlankLayout from "../../layouts/BlankLayout";

function LoginPage() {

    let history = useHistory()
    const [values, setValues] = React.useState({
        userName: '',
        password: '',
        showPassword: false,
    });
    const moveToRegistrationPage = () => {
        history.push('/registration')
    }

    return (
        <BlankLayout>
            <LoginForm
                moveToRegistrationPage={moveToRegistrationPage}
                values={values}
                setValues={setValues}
                history={history}
            />
        </BlankLayout>
    )
}

export default LoginPage