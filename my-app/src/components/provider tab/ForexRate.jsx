import React from "react";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import ReactCountryFlag from "react-country-flag"


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: '2vh',
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

const defaultRate= {
    "CAD": 1.5484,
    "HKD": 9.1972,
    "ISK": 161.3,
    "PHP": 57.206,
    "DKK": 7.4489,
    "HUF": 359.5,
    "CZK": 26.34,
    "AUD": 1.6227,
    "RON": 4.8735,
    "SEK": 10.2168,
    "IDR": 16840.24,
    "INR": 87.941,
    "BRL": 6.3347,
    "RUB": 90.2622,
    "HRK": 7.5665,
    "JPY": 123.18,
    "THB": 35.922,
    "CHF": 1.0811,
    "SGD": 1.5934,
    "PLN": 4.4639,
    "BGN": 1.9558,
    "TRY": 9.047,
    "CNY": 7.7916,
    "NOK": 10.6613,
    "NZD": 1.7086,
    "ZAR": 18.2192,
    "USD": 1.1863,
    "MXN": 23.8656,
    "ILS": 3.9608,
    "GBP": 0.89393,
    "KRW": 1323.26,
    "MYR": 4.8549
}


const ForexRate = () => {
    const classes = useStyles();
    let rate = useSelector(state => state.ratesreducer);
    rate = rate.payload;

    return (
        <div style={{ height: '10.5vh', width: '100%' }}>
            <Grid container spacing={3}>
                {
                    rate === undefined && Object.keys(defaultRate).filter(t => codes.includes(t)).map(function (key, index) {
                        if (defaultRate[key] !== 1 && index<6)
                            return (
                                <Grid item xs={2}>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography gutterBottom variant="h6" component="h3">
                                            {key}
                                            <ReactCountryFlag style={{marginLeft:'5%', border: '1px dotted black',height:'30%', width:'40%'}} countryCode={key.substring(0, 2)} svg />
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h1">
                                            {Math.round(defaultRate[key]*100)/100}
                                        </Typography></Card>
                                </Grid>
                            );
                    })
                }
                {
                    rate !== undefined && Object.keys(rate).filter(t => codes.includes(t)).map(function (key, index) {
                        if (rate[key] !== 1 && index<6)
                            return (
                                <Grid item xs={2}>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {key}
                                            <ReactCountryFlag style={{marginLeft:'5%', border: '1px dotted black',height:'30%', width:'40%'}} countryCode={key.substring(0, 2)} svg />
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h1">
                                            {Math.round(rate[key]*100)/100}
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
