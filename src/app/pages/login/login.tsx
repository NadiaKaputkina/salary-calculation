import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    makeStyles
} from "@material-ui/core";
import {
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import { selectProfileAuth } from "../../../flux/selector/profile";
import { login } from "../../../flux/actions/profile";

const useStyles = makeStyles((theme) => ({
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
    loginButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    },
}))

export default function Login() {

    const auth = useSelector(selectProfileAuth)
    console.log('auth', auth)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(login({authenticated: true}))
    }, [isAuthenticated])

    const handleChange = (prop: string) => (event: any) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleLoginButton = () => {
        setIsAuthenticated(true)
    }

    return (
        <div className={classes.loginLayout}>
            <FormControl className={classes.loginForm}>
                <InputLabel
                    className={classes.label}
                    htmlFor="standard-adornment-password"
                >
                    Password</InputLabel>
                <Input
                    color="secondary"
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.loginForm}>
                <InputLabel
                    className={classes.label}
                    htmlFor="login"
                >
                    Login</InputLabel>
                <Input
                    id="login"
                    aria-describedby="my-helper-text"
                />
            </FormControl>
            <Button
                className={classes.loginButton}
                size="medium"
                color="primary"
                onClick={handleLoginButton}
            >
                Sign in
            </Button>
        </div>
    )
}