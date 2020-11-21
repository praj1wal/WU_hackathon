import React from "react";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    currency_app: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },

}));

const codes = ["USD", "INR", "GBP", "EUR", "AUD", "JPY", "HRK", "RUB", "CHF", "CAD"];

const ForexRate = () => {
    const classes = useStyles();
    let rate = useSelector(state => state.ratesreducer);
    rate = rate.payload;

    return (
        <div>
            <Grid container spacing={3}>
                {
                    rate !== undefined && Object.keys(rate).filter(t => codes.includes(t)).map(function (key, index) {
                        if (rate[key] !== 1)
                            return (
                                <Grid item xs={4}>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {key}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h1">
                                            {rate[key]}
                                        </Typography></Card>
                                </Grid>
                            );
                    })
                }
            </Grid>
        </div>

    );

}

export default ForexRate;
