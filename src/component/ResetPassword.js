import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import Axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .matches(
            "^(?=.{4,})(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]*$",
            "Must Contain 4 Characters, at least One Uppercase and One Number"
        ),
    confirmedPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'password must match')
})

export default function ForgotPassword(props) {
    const [login, setLogin] = useState(false)
    const [reset, setReset] = useState()
    const classes = useStyles();
    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: values => {
            Axios.put("https://d-bookstore.herokuapp.com/user", {
                email: props.user.email, password: values.password
                , firstName: props.user.firstName, lastName: props.user.lastName
            }, headers).then((response => {
                if (response.status === 200)
                    setReset("Password Changed Successfully!")
            }))
        }
    })

    return (
        <Container component="main" maxWidth="xs">
            {login ?
                <Redirect to={"/login"}/> : null
            }
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Password
                </Typography>
                {reset !== undefined ?
                    (
                        setTimeout(() => {
                                setLogin(true)
                            },
                            1000),
                            <Typography component="h3" variant="h6" style={{color: "green"}}>
                                {reset}
                            </Typography>
                    )
                    :
                    null
                }
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {console.log("helo")}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size="small"
                                onChange={handleChange}
                                value={values.password}
                            />
                            {errors.password ? errors.password : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmedPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmedPassword"
                                autoComplete="current-password"
                                size="small"
                                onChange={handleChange}
                                value={values.confirmedPassword}
                            />
                            {errors.confirmedPassword ? errors.confirmedPassword : null}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </Container>
    );
}