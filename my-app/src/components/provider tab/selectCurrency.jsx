import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl,Grid,Select} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


var codes = ["USD","INR","GBP","EUR","AUD","JPY","HRK","RUB","CHF","CAD"];

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function SelectCurrency({setGraphSource,setGraphTarget}) {

  const [mycode,setCodes] = useState(codes);
  const [currSource,setCurr]= useState(null);

  const [currTarget,setTarget] = useState(null);
  let [rate, setRate] = React.useState([]);



  const SourceClick = (event) => {
    setCurr(event.target.value);
  };

  const TargetClick = (event) =>{
    setTarget(event.target.value);
  };

  const handleClick = (event) =>{
//    after button is clicked all forrex info should be displayed from backend
   
    const fetchData = async() => {
      axios({
        "method": "GET",
        "url": "https://api.exchangeratesapi.io/latest?base="+ currSource,
      })
      .then((response) => {
        setRate(response.data.rates)
        // console.log(rate)
      })
      .catch((error) => {
        console.log(error)
      })
    };
    fetchData();

    setGraphSource(currSource);
    setGraphTarget(currTarget);
  };


  const classes = useStyles();

  return (
    <div className="main_app">

       <div className="currency_app">

        <FormControl className="app_dropdown">
           <label>Source Currency</label>
           <Select variant="outlined"  onChange={SourceClick} value={currSource}>

            {
              mycode.map(code => (
                <MenuItem value={code}>{code}</MenuItem>
              ))
            }

          </Select>

        </FormControl>
        {
        ("             ")
        }
        <FormControl className="app_dropdown">

          <label>target Currency</label>
          <Select variant="outlined"  onChange={TargetClick} value={currTarget}>

            {
              mycode.map(code => (
                <MenuItem value={code}>{code}</MenuItem>
              ))
            }

          </Select>

        </FormControl>



       </div>
       <Button id="button_div" onClick={handleClick}  variant="outlined" color="default">Submit</Button>
       {/*<ul>
       { Object.keys(rate).forEach(function (key){
         console.log(key + " " + rate[key])//rate[codes[i]]
         return <li>hi</li>
       })}
       </ul>
       <ul>
        {codes.map(item => {
          return <li>{item[0]}</li>;
        })}
      </ul>*/}
      <div>
      <Grid container spacing={3}>
      {
        Object.keys(rate).filter(t => codes.includes(t)).map(function(key, index) {
          if(rate[key]!=1)

          return         <Grid item xs={4}>
          <Card className={classes.root} variant="outlined">
            <Typography gutterBottom variant="h5" component="h2">
              {key}
            </Typography>
            <Typography gutterBottom variant="h6" component="h1">
              {rate[key]}
            </Typography></Card>
            </Grid>;
        })
      }
      </Grid>
      {/* <ul>
      {
        Object.keys(rate).map(function(key, index) {
          return <li>{key+" "+rate[key]}</li>;
        })
      }
      </ul>

       {rate.CAD} */}
       </div>
    </div>
  );
}
export default SelectCurrency;
