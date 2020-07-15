import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import * as Yup from 'yup'
import {useFormik} from "formik";
import Axios from "axios";
import LinearIndeterminate from "./loading";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "blue",
        color: "white",
        "&:hover": {
            backgroundColor: "blue"
        }
    },
}));

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "Minimum 3 characters"),
    lastName: Yup.string().min(3, "Minimum 3 characters"),
    email: Yup.string().email("Invalid"),
    password: Yup.string()
        .matches(
            "^(?=.{4,})(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]*$",
            "Must Contain 4 Characters, at least One Uppercase and One Number"
        ),
    confirmedPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'password must match')
})

export default function SignUp() {
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false)

    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmedPassword: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true)
            Axios.all([
                Axios.post("http://localhost:8080/user", values),
                Axios.post("http://localhost:8080/mail-sender/register", {
                    name: values.firstName,
                    email: values.email
                })
            ])
                .then(Axios.spread((registration, email) => {
                    if (registration.status === 201)
                        setMessage("User Registered Successfully!")
                    setLoading(false)
                }))
                .catch(error => {
                    if (error.response.status === 409)
                        setMessage("Email Already Registered!");
                    setLoading(false)
                })
        }
    })

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper className={classes.paper} variant="elevation">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {loading ?
                    <LinearIndeterminate/>
                    : null
                }
                <Typography component="h3" variant="h6" style={message === 'User Registered Successfully!'
                    ? {color: "green"} : {color: "#e60000"}}>
                    {message}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                size="small"
                                onChange={handleChange}
                                value={values.firstName}

                            />
                            <div style={{color: "red"}}>
                                {errors.firstName ? errors.firstName : null}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                size="small"
                                onChange={handleChange}
                                value={values.lastName}
                            />
                            <div style={{color: "red"}}>
                                {errors.lastName ? errors.lastName : null}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                size="small"
                                onChange={handleChange}
                                value={values.email}
                            />
                            <div style={{color: "red"}}>
                                {errors.email ? errors.email : null}
                            </div>
                        </Grid>
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
                            <div style={{color: "red"}}>
                                {errors.password ? errors.password : null}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmedPassword"
                                label="Confirmed Password"
                                type="password"
                                id="confirmedPassword"
                                autoComplete="current-password"
                                size="small"
                                onChange={handleChange}
                                value={values.confirmedPassword}
                            />
                            <div style={{color: "red"}}>
                                {errors.confirmedPassword ? errors.confirmedPassword : null}
                            </div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <h1></h1>{}
            </Paper>
        </Container>
    );
}