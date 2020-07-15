import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
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
        marginBottom: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(6, 0, 5),
    },
}));

export default function Profile(props) {
    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)
    const classes = useStyles();
    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }

    const handleChange = () => {
        setEdit(!edit)
        if (edit)
            Axios.put("http://localhost:8080/user", {
                firstName: firstName, lastName: lastName, password: props.user.password, role: props.user.role
            }, headers).then((response) => {
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            })
    }

    return (
        <div>
            {localStorage.getItem('key') === "" ?
                <Redirect to={"/login"}/>
                :
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Paper className={classes.paper} variant="elevation">
                        <Typography component="h1" variant="h5">
                            My Profile
                        </Typography>
                        <form className={classes.form}>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        size="small"
                                        defaultValue={props.user.firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        disabled={!edit}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        size="small"
                                        onChange={(event) => setLastName(event.target.value)}
                                        defaultValue={props.user.lastName}
                                        disabled={!edit}
                                    />
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
                                        defaultValue={props.user.email}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="role"
                                        label="Role"
                                        type="role"
                                        id="role"
                                        size="small"
                                        defaultValue={props.user.role}
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>
                            {edit ?
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleChange}
                                >
                                    SAVE
                                </Button>
                                :
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleChange}
                                >
                                    CHANGE
                                </Button>
                            }
                        </form>
                    </Paper>
                </Container>
            }
        </div>
    );
}