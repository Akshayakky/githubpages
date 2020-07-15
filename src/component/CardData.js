import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '60%',
        width: '40%',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: '50%',
        transform: 'translate(-50%)',
    },
    mediaContainer: {
        backgroundColor: '#f2f2f2',
        boxShadow: 'none',
        borderRadius: 0,
        [theme.breakpoints.up('md')]: {
            minWidth: 150,
        },
    },
    cardContent: {
        height: 70,
        flexGrow: 0,
    },
    price: {
        padding: 0,
        margin: 0,
        fontWeight: 'bold',
    },
    root: {
        '& > span': {
            margin: theme.spacing(2),
        },
    },
    input: {
        padding: 10,
        margin: 3,
        maxHeight: 1,
        width: 20,
        textAlign: "center"
    },
    textField: {
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        marginLeft: 20
    }
}));

export default function CardData(props) {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(props.quantity);

    const handleChange = (qua) => {
        if (qua === 1) {
            setQuantity(quantity - 1)
            props.updateQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
            props.updateQuantity(quantity + 1)
        }
    }

    let bookTitle;
    let bookAuthor;
    let bookPrice;
    let bookImage;
    let bookDescription;
    if (props.book !== undefined) {
        bookAuthor = props.book.bookAuthor
        bookTitle = props.book.bookTitle
        bookPrice = "Rs. " + props.book.bookPrice
        bookImage = props.book.bookImage
        bookDescription = props.book.bookDescription
    }
    return (
        <div style={{display: props.display}}>
            <Card className={classes.mediaContainer} style={{background: props.backgroundcolor}}>
                <CardMedia
                    className={classes.cardMedia}
                    image={bookImage}
                    title={bookDescription}
                    style={props.style}
                />
            </Card>
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="h2">
                    {bookTitle}
                </Typography>
                <Typography variant={"caption"} color="textSecondary" display="block">
                    {bookAuthor}
                </Typography>
                <Typography variant={"caption"} className={classes.price}>
                    {bookPrice}
                </Typography>
                {props.page === "cart" ?
                    <div>
                        <ButtonBase type="button" disabled={quantity < 2 ? true : false} centerRipple
                                    onClick={() => handleChange(1)}>
                            <RemoveCircleOutlineIcon color="primary"/>
                        </ButtonBase>
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            disabled={true}
                            inputProps={{
                                className: classes.input,
                            }}
                            value={props.quantity}
                        />
                        <ButtonBase type="button" centerRipple onClick={() => handleChange(2)}>
                            <AddCircleOutlineIcon color="primary"/>
                        </ButtonBase>
                        <Typography
                            type="Button"
                            onClick={props.onChange}
                            className={classes.text}
                            align="left" display='inline'
                            style={{cursor: "pointer"}}
                        >
                            Remove
                        </Typography>
                    </div>
                    : <></>
                }
                {props.page === "summary" ?
                    <div>
                        <br/>
                        ({props.quantity})
                    </div>
                    : <></>
                }
            </CardContent>
        </div>
    );
}
