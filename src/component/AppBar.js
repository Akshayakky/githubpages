import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            marginLeft: theme.spacing(2),
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "white",
        width: 500,
        marginLeft: theme.spacing(2),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "black"
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        color: "black"
    },
    bookIcon: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(20),
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isLoggedIn = props.login || localStorage.getItem('key') !== ""

    const handleChange = (event) => {
        props.setSearch(event.target.value)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setTokenInStorage = () => {
        localStorage.setItem('key', "")
        localStorage.setItem('userEmail', "")
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{background: '#990033'}}>
                <Toolbar>
                    <Link to={"/"} style={{color: "white"}}>
                        <MenuBookIcon className={classes.bookIcon}/>
                    </Link>
                    <Typography className={classes.title} variant="h6" noWrap>
                        The Bookstore
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                                onChange={handleChange.bind(this)}
                            />
                        </Link>
                    </div>
                    <div className={classes.grow}/>
                    <div style={{marginTop: 5}}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={props.cartCount} color="secondary">
                                <Link to={isLoggedIn ? "/cart" : "/login"}
                                      style={{color: "white", style: "none"}}>
                                    <ShoppingCartIcon/>
                                </Link>
                            </Badge>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {isLoggedIn ?
                                <MenuItem disabled={true}><b>Hello {props.user.firstName}!</b></MenuItem> : null
                            }
                            <Link to={!isLoggedIn ? "/login" : "/profile"}
                                  style={{textDecoration: "none", color: "black"}}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                            </Link>
                            {isLoggedIn ?
                                <Link to={"/my-order"} style={{textDecoration: "none", color: "black"}}>
                                    <MenuItem onClick={handleClose}>My Orders</MenuItem>
                                </Link>
                                : null
                            }
                            {props.user.role === "admin" && isLoggedIn ?
                                <Link to={"/admin"}
                                      style={{textDecoration: "none", color: "red"}}>
                                    <MenuItem onClick={handleClose}>Add Books</MenuItem>
                                </Link> :
                                null
                            }
                            {localStorage.getItem('key') !== "" ?
                                <MenuItem onClick={setTokenInStorage.bind(this)}>Sign Out</MenuItem>
                                :
                                <Link to="/login" style={{textDecoration: "none", color: "black"}}>
                                    <MenuItem onClick={handleClose}>Sign In</MenuItem>
                                </Link>
                            }
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}