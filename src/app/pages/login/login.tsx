import React from 'react';
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
import { loginLogoutService } from "../../../flux/actions/profile";
import { withRouter } from "react-router";

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
        width: '100%'
    },
    loginButtonLayout: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
}))

function Login(props: any) {

    const {
        history
    } = props

    const auth = useSelector(selectProfileAuth)
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
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
        dispatch(loginLogoutService({authenticated: true}))
        history.push('home')
    }

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
                <Button
                    className={classes.loginButton}
                    size="medium"
                    color="primary"
                    onClick={handleLoginButton}
                >
                    Sign in
                </Button>
            </div>
        </div>
    )
}

export default withRouter(Login)