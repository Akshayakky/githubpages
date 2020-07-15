import React, {useEffect, useState} from 'react';
import CardData from './CardData'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#990033'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(12),
    },
    card: {
        height: '100%',
        boxShadow: 'none',
        border: "thin solid #d9d9d9",
    },
    addButton: {
        width: '100%',
        border: "thin solid #d5cccc",
        padding: 0,
        boxShadow: 'none',
        height: 30,
        textAlign: 'center',
        backgroundColor: "#b3003b"
    },
    wishlistButton: {
        width: '50%',
        border: "thin solid #d5cccc",
        padding: 0,
        boxShadow: 'none',
        height: 30,
        textAlign: 'center',
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            transform: 'translate(-50%, -50%)',
            position: 'relative',
            marginLeft: '59%',
            bottom: 60,
            [theme.breakpoints.down('sm')]: {
                bottom: 40,
                marginLeft: '50%',
            },
        },
    },
    center: {
        '& > *': {
            marginTop: theme.spacing(2),
            transform: 'translate(-50%, -50%)',
            position: 'relative',
            marginLeft: '63.5%',
            bottom: 60,
            [theme.breakpoints.down('sm')]: {
                bottom: 40,
                marginLeft: '56%',
            },
        },
    },
    title: {
        marginTop: '3.1%',
        float: "left",
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(24),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        marginTop: '2.5%',
        width: 200,
        float: "right",
        border: "1px solid #d9d9d9",
        borderBottom: "none"
    },
}));

export default function CardGrid(props) {
    const [bookData, setBookData] = useState();
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const [page, setPage] = React.useState(1);
    const [error, setError] = useState();
    const [expired, setExpired] = useState(false);
    const itemsPerPage = 12;
    const cards = [];
    const jwtDecoder = require("jsonwebtoken")

    useEffect(() => {
        axios.get('http://localhost:8080/book/sorted/default/' + props.search)
            .then((results) => {
                setBookData(results.data);
            }).catch((error) => {
            if (error.response.status === 404)
                setError("No Books Found!")
            if (error.response.status === 403)
                setExpired(true);
        });
        setPage(1);
    }, [props.search]);

    useEffect(() => {
        if (localStorage.getItem('key') !== "")
            axios.get('http://localhost:8080/cart', headers)
                .then((results) => {
                    setCart(() => cart.concat(results.data))
                });
        setPage(1);
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const updateCart = () => {
        addedToCart = false
    }

    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }

    var addedToCart = true;

    const addBook = (value) => {
        axios.post('http://localhost:8080/cart', {book: value, quantity: 1}
            , headers)
            .then((results) => {
                setCart(() => cart.concat(results.data))
            }).catch(error => {
            if (error.response.status === 403)
                setExpired(true);
        });
    }

    const handleSort = (event) => {
        axios.get('http://localhost:8080/book/sorted/' + event.target.value + "/" + props.search)
            .then((results
            ) => {
                setBookData(results.data);
            });
        setPage(1);
    }

    if (localStorage.getItem('key') !== "" && jwtDecoder.decode(localStorage.getItem('key')).exp < Date.now() / 1000) {
        localStorage.setItem('key', "")
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    if (bookData !== undefined) {
        var records = (bookData.length)
        for (let bookId = 1 + itemsPerPage * (page - 1); bookId <= itemsPerPage * page && bookId <= bookData.length
            ; bookId++) {
            (cards.push(bookId));
        }
    }

    return (
        <>
            {expired ?
                <Redirect to={"/login"}/> : null
            }
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                Books({records} books)
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    defaultValue={"default"}
                    labelId="demo-simple-select-filled-label"
                    id="select"
                    onChange={handleSort}
                >
                    <MenuItem value="default"> Sort By : Default</MenuItem>
                    <MenuItem value="increasing">Price : Low to High</MenuItem>
                    <MenuItem value="decreasing">Price : High to Low</MenuItem>
                    <MenuItem value="newlyArrived">Newly Arrived</MenuItem>
                </Select>
            </FormControl>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    {cards.map((card, i) => <Grid item key={card} xs={12} sm={6} md={3}>
                        {addedToCart = true}
                        <Card className={classes.card}>
                            {
                                cart.map(num => {
                                    if (JSON.stringify(num.book) === JSON.stringify(bookData[card - 1]))
                                        updateCart();
                                })}
                            <CardData book={bookData[card - 1]}/>
                            <CardActions>
                                {addedToCart ?
                                    <MuiThemeProvider theme={theme}>
                                        {localStorage.getItem('key') === "" ?
                                            <Button size={"large"} variant={"contained"} color={"secondary"}
                                                    className={classes
                                                        .addButton}
                                                    onClick={addBook.bind(this, bookData[card - 1].bookId)}>
                                                <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                                                    <Typography variant={"caption"}>
                                                        ADD TO CART
                                                    </Typography>
                                                </Link>
                                            </Button>
                                            :
                                            <Button size={"large"} variant={"contained"} color={"secondary"}
                                                    className={classes
                                                        .addButton}
                                                    onClick={addBook.bind(this, bookData[card - 1])}>
                                                <Typography variant={"caption"}>
                                                    ADD TO CART
                                                </Typography>
                                            </Button>
                                        }
                                    </MuiThemeProvider>
                                    :
                                    <button className={classes.addButton}
                                            style={{width: "100%", backgroundColor: "blue"}}>
                                        <Typography variant={"caption"} style={{color: "white"}}>
                                            ADDED TO BAG
                                        </Typography>
                                    </button>
                                }
                            </CardActions>
                        </Card>
                    </Grid>)}
                    <Grid container justify="center">
                        <Typography component="h3" variant="h4">{error}</Typography>
                    </Grid>
                </Grid>
            </Container>
            {bookData !== undefined ?
                <div className={records / itemsPerPage >= 3 ? classes.root : classes.center}>
                    <Pagination count={Math.ceil(records / itemsPerPage)} color="secondary" page={page}
                                onChange={handleChange}/>
                </div>
                :
                null
            }
        </>
    )
}