import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Input,
    InputLabel,
    makeStyles
} from "@material-ui/core";
import {
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../flux/actions/profile";

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

export default function LoginForm(props: any) {

    const {
        values,
        setValues,
        setRegButtonClicked,
        history,
    } = props

    const classes = useStyles();

    const dispatch = useDispatch();

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
        dispatch(loginAction(history));
    };
    const handleRegButtonClicked = () => {
        setRegButtonClicked(true)
    };

    return (
        <div className={classes.loginLayout}>
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
            <div
                className={classes.loginButtonLayout}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant='contained'
                            size="medium"
                            color="primary"
                            onClick={handleLoginButton}
                        >
                            Sign in
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            size="medium"
                            color="secondary"
                            onClick={handleRegButtonClicked}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
