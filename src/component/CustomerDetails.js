import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import Axios from "axios";

const useStyle = makeStyles((theme) => ({
    layout: {
        margin: "50px",
        [theme.breakpoints.up('md')]: {
            margin: "50px 200px"
        }
    },
    paper: {
        borderColor: "#d9d9d9",
        borderRadius: 0,
        backgroundColor: 'rgba(242, 242, 242,0.09)',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    heading: {
        padding: theme.spacing(1, 0, 2),
    },
    buttons: {
        backgroundColor: "#990033",
        color: "white",
        borderRadius: 0,
        height: 30,
        [theme.breakpoints.up('md')]: {
            marginLeft: '80%',
        },
        marginBottom: '2%',
        width: 115,
        border: "none"
    },
}));


export default function CustomerDetails(props) {
    const [edit, setEdit] = useState(false)
    const [customerId, setCustomerId] = useState()
    const [update, setUpdate] = useState(false)
    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            pinCode: '',
            locality: '',
            address: '',
            landmark: '',
            city: '',
            addressType: 'work'
        },
        onSubmit: values => {
            if (update) {
                Axios.put('http://localhost:8080/customer/' + customerId, formik.values, headers)
                    .then(response => {
                        props.onClick()
                    })
                setEdit(true)
            } else {
                Axios.post('http://localhost:8080/customer', formik.values, headers)
                    .then(response => {
                        setCustomerId(response.data.customerId)
                        props.onClick()
                        props.setCustomer(response.data)
                    })
                setUpdate(true)
                setEdit(true)
            }
        },
        validate: values => {
            let error = {}
            if (values.name.length < 3)
                error.name = 'name at least have 3 character'
            if (!/^[0-9]{10}$/i.test(values.phoneNumber))
                error.phoneNumber = 'Must have 10 digit'
            if (!/^[0-9]{6}$/i.test(values.pinCode))
                error.pincode = 'Must have 6 digit'
            return error
        }
    })

    const classes = useStyle();

    function editForm() {
        setEdit(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <main className={classes.layout}>
                <Paper className={classes.paper} variant="outlined" square>
                    <React.Fragment>
                        <Typography color="inherit"
                                    noWrap
                                    variant="h6"
                                    gutterBottom
                                    align="left"
                        >
                            Customer Details
                        </Typography>
                        <Typography
                            align="right"
                            gutterBottom
                            style={{cursor: "pointer"}}
                            onClick={editForm}
                        >
                            {edit ? "Edit" : ""}
                        </Typography>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        type="text"
                                        id="name"
                                        name="name"
                                        label="Full Name"
                                        fullWidth
                                        value={formik.values.name}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        type="number"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                    {formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        type="number"
                                        id="pincode"
                                        name="pinCode"
                                        label="Pincode"
                                        value={formik.values.pinCode}
                                        fullWidth
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                    {formik.errors.pincode ? <div>{formik.errors.pincode}</div> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        id="locality"
                                        name="locality"
                                        label="Locality"
                                        value={formik.values.locality}
                                        fullWidth
                                        autoComplete="locality"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        id="address"
                                        name="address"
                                        label="Address"
                                        value={formik.values.address}
                                        fullWidth
                                        // multiline
                                        rows={2}
                                        autoComplete="shipping address"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        id="city"
                                        name="city"
                                        label="City"
                                        value={formik.values.city}
                                        fullWidth
                                        autoComplete="shipping address-city"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled={edit}
                                        id="landmark"
                                        name="landmark"
                                        label="Landmark"
                                        value={formik.values.landmark}
                                        fullWidth
                                        autoComplete="address-landmark"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        size="small"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="left">
                                        Type
                                    </Typography>
                                </Grid>
                                <FormControl component="fieldset">
                                    <RadioGroup name="addressType" value={formik.values.addressType}
                                                onChange={formik.handleChange}>
                                        <div>
                                            <FormControlLabel disabled={edit} value="work" control={<Radio/>}
                                                              label="Work"/>
                                            <FormControlLabel disabled={edit} value="home" control={<Radio/>}
                                                              label="Home"/>
                                            <FormControlLabel disabled={edit} value="other" control={<Radio/>}
                                                              label="Other"/>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {!edit ?
                            <button type="submit" className={classes.buttons}>
                                CONTINUE
                            </button>
                            : null
                        }
                    </React.Fragment>
                </Paper>
            </main>
        </form>
    );
}