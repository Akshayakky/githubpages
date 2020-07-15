import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import img from "../images/cracker3.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 15
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 700
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: 100,
        height: 128,
    },
}));

export default function OrderDetails(props) {
    const classes = useStyles();
    let title;
    let author;
    let image;
    if (props.book !== undefined) {
        title = props.book.bookTitle;
        image = props.book.bookImage;
        author = props.book.bookAuthor
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <div>
                    <Grid container spacing={3}>
                        <Grid item>
                            <img className={classes.img} alt="complex" src={image}/>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={4}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" align="justify">
                                        {title}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="textSecondary" align="left">
                                        By {author}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" align="left">
                                        ({props.quantity})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Typography gutterBottom variant="subtitle1" align="left">
                                    <b>
                                        Rs. {props.price}
                                    </b>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
}