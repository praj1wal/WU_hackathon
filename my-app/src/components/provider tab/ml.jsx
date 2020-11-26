import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { useSelector } from "react-redux";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '80%',
        height: '80%',
        //padding: '0 30px',
        marginRight: "10%",
        marginLeft: "10%",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function Prediction() {


 
    let [mlData, setMlData] = useState('');
    let [mlState, setMlState] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date()-0);
    const currencies = useSelector(state => state.currencyreducer);
    const srcCurrency = currencies.srcCurrency;
    const tarCurrency = currencies.tarCurrency;

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date-0);
      };


    const handleClick = () => {

 
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/predict/?IN=" + srcCurrency + "&OUT=" + tarCurrency);
            setMlData(response.data)
            console.log("This is our great prediction", mlData);
            setMlState(true)
        };
        fetchData()
    }
    return (
        <div >
            <Card style={{ height: '42vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Prediction
            </Typography>
                    {mlState === false && <Typography gutterBottom variant="h6" component="h2">
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData < 0.35 ? <h1>bearish</h1> : (mlData > 0.65 ? <h1>bullish</h1> : <h1>Cannot Determine</h1>))}</Typography>
                </CardContent>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form  noValidate>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="start-date-picker-inline"
                        label="Start Date picker inline"
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    
                    
                    {/* <StyledButton id="button_div" onClick={OnClickHandler} variant="outlined" color="default">Submit</StyledButton> */}
                </form>
                </MuiPickersUtilsProvider>    

            </Card>
            
            <StyledButton onClick={handleClick}>Predict Me</StyledButton>

        </div>


    );
}