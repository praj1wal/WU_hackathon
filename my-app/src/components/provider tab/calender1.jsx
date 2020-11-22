import 'date-fns';
import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {useSelector} from "react-redux";
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { CardContent, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


export default function Calen() {
  // The first commit of Material-UI
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date()-0);
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date()-0);

  let [high, setHigh] = useState();
  let [low, setLow] = useState();

  let [stringo, setStringo] = useState('');

  let [infoValue, setInfoValue] = useState(false);


  const currencies= useSelector(state=>state.currencyreducer);
    const srcCurrency=currencies.srcCurrency;
    const tarCurrency=currencies.tarCurrency;



  const handleStartDateChange = (date) => {
    setSelectedStartDate(date-0);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date-0);
  };

  async function OnClickHandler(){
    let start=selectedStartDate/1000;
    let end= selectedEndDate/1000;
    var difference = selectedEndDate - selectedStartDate;
    var daysDifference = Math.floor(difference/1000/60/60/24);
    if(daysDifference>30){
      setStringo('Year');
    }
    else if(daysDifference>7){
      setStringo('Month');
    }
    else{
      setStringo('Week');
    }
    console.log("srcC",srcCurrency," tarC",tarCurrency,"startDate",start,"endDAte",end,"diff",daysDifference);
    const response = await axios.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:"+srcCurrency+"_"+tarCurrency+"&resolution=D&from=" + start + "&to=" + end + "&token=bun19kv48v6pkdmogb80")
    console.log("Inside Calender =  ",response.data);
    let a=Math.max.apply(Math,response.data.h);
    let b=Math.min.apply(Math,response.data.l);
    setHigh(a);
    setLow(b);
    setInfoValue(true);
    console.log("Max",a," Min ",b);
}



  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <form className={classes.container} noValidate>
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
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="end-date-picker-inline"
          label="End Date picker inline"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {console.log('DAte is',selectedStartDate, selectedEndDate)}
        <StyledButton id="button_div" onClick={OnClickHandler}  variant="outlined" color="default">Submit</StyledButton>
    </form>
      </Grid>
      {infoValue===true &&<div> <Card>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            Best Rate for the {stringo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {high}
          </Typography>
        </CardContent>
        </Card>
        <Card>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            Worst Rate for the {stringo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {low}
          </Typography>
        </CardContent>
      </Card>
      </div>}
    </MuiPickersUtilsProvider>
  );
}