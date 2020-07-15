import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import Axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import LinearIndeterminate from "./loading";
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
    email: Yup.string().email("Invalid")
})

export default function ForgotPassword(props) {
    const [login, setLogin] = useState(false)
    const [mailSent, setMailSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const classes = useStyles();
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);
            Axios.get("http://localhost:8080/user?email=" + values.email)
                .then((response) => {
                        Axios.post("http://localhost:8080/mail-sender/forget-password", {
                            email: values.email,
                            password: response.data.password,
                            name: response.data.firstName
                        }).then((response) => {
                            props.setForgetPasswordJwt(response.data.jwt);
                            localStorage.setItem('userEmail', values.email)
                            localStorage.setItem('key', response.data.jwt)
                            setLoading(false)
                            setMailSent(true)
                            setError()
                        })
                    }
                ).catch(error => {
                if (error.response.status === 404) {
                    setError("User Not Registered!")
                    setLoading(false)
                    setMailSent(false)
                }
            })
        }
    })

    return (
        <Container component="main" maxWidth="xs">
            {login ?
                <Redirect to={"/"}/> : null
            }
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                {loading ?
                    <LinearIndeterminate/>
                    : null
                }
                <Typography component="h1" variant="h5">
                    Forget Password
                </Typography>
                <Typography component="h4" variant="h5" style={{color: "#e60000"}}>
                    {error}
                </Typography>
                {mailSent ?
                    <Typography component="h3" variant="h6" style={{color: "green"}}>
                        Password reset link is sent to your email.
                    </Typography>
                    :
                    null
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={values.email}
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <div style={{color: "red"}}>
                        {errors.email ? errors.email : null}
                    </div>
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