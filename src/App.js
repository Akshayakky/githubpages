// import React from 'react';
// import logo from './logo.svg';
// import Order from './Order'
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <Order/>
//     </div>
//   );
// }
//
// export default App;






import React, {useEffect, useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import Profile from "./component/Profile";
import Cart from './component/Cart'
import CardGrid from './component/CardGrid'
import Login from './component/Login'
import SignUp from './component/SignUp'
import CustomerDetails from './component/CustomerDetails'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import OrderConfirm from "./component/OrderConfirm";
import Axios from "axios";
import Admin from "./component/Admin";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import MyOrder from "./component/MyOrder";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#990033",
        padding: theme.spacing(1),
        position: "fixed",
        maxHeight: 40,
        bottom: 0,
        width: '100%',
        height: 60, /* Height of the footer */
        background: '#6cf',
    },
}));

export default function () {
    const [cartCount] = useState(0)
    const [search, setSearch] = useState("")
    const [login, setLogin] = useState("")
    const [user, setUser] = useState("")
    const [jwt, setJwt] = useState("")
    const classes = useStyles();
    const jwtDecoder = require("jsonwebtoken")

    useEffect(() => {
        if (localStorage.getItem('key') !== "" && localStorage.getItem('key') !== undefined && localStorage.getItem('key') != null) {
            console.log(localStorage.getItem('key'))
            console.log(jwtDecoder.decode(localStorage.getItem('key')))
            Axios.get("http://localhost:8080/user?email=" + jwtDecoder.decode(localStorage.getItem('key')).sub)
                .then((response) => {
                        console.log("loaded user")
                        setUser(response.data)
                    }
                )
        }
        setJwt(localStorage.getItem('jwt'))
    }, [login])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <PrimarySearchAppBar user={user} login={login} cartCount={cartCount}
                                     setSearch={(value) => setSearch(value)}/>
                <main>
                    <Switch>
                        <Route path="/githubpages" exact
                               component={() => (<CardGrid search={search}/>)}/>
                        <Route path="/sign-up" exact
                               component={() => (<SignUp/>)}/>
                        <Route path="/my-order" exact
                               component={() => (<MyOrder/>)}/>
                        <Route path="/forgot-password" exact
                               component={() => (<ForgotPassword
                                   setForgetPasswordJwt={(jwt) => localStorage.setItem('jwt', "/reset-password/" + jwt)}/>)}/>
                        <Route path="/admin" exact
                               component={() => (<Admin/>)}/>
                        <Route path="/profile" exact
                               component={() => (<Profile user={user}/>)}/>
                        <Route path="/login" exact
                               component={() => (<Login login={(login) => setLogin(login)}/>)}/>
                        <Route path="/cart" exact
                               component={() => (<Cart cartCount={cartCount}/>)}/>
                        <Route path="/customer" exact
                               component={() => (<CustomerDetails/>)}/>
                        <Route path="/order-confirm" exact
                               component={() => (<OrderConfirm/>)}/>
                        <Route path={jwt} exact
                               component={() => (<ResetPassword user={user}/>)}/>
                    </Switch>
                </main>
            </Router>
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {new Date().getFullYear()} Copyright: <a href="https://www.bookstore.com"> TheBookStore.com </a>
                </Typography>
            </footer>
        </React.Fragment>
    );
}

