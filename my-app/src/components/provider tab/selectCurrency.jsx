import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl,Grid,Select} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import setCurrency from "../actions/setCurrency";
import InputLabel from '@material-ui/core/InputLabel';
import {useDispatch} from "react-redux";
import { useTheme } from '@material-ui/core/styles';


var codes = ["USD","INR","GBP","EUR","AUD","JPY","HRK","RUB","CHF","CAD"];

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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  currency_app :{
    display:'flex',
    alignItems : 'center',
    justifyContent : 'center',
  },
  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },

}));

function SelectCurrency() {

    const dispatch=useDispatch();
  const [mycode,setCodes] = useState(codes);
  const [currSource,setCurr]= useState(null);

  const [currTarget,setTarget] = useState(null);

  const [openS,setOpenS] = useState();
  const [openT,setOpenT] = useState();

  let [rate, setRate] = React.useState([]);


  const handleCloseS = () => {
    setOpenS(false);
  };

  const handleOpenS = () => {
    setOpenS(true);
  };

  const handleCloseT = () => {
    setOpenT(false);
  };

  const handleOpenT = () => {
    setOpenT(true);
  };

  const SourceClick = (event) => {
    setCurr(event.target.value);
  };

  const TargetClick = (event) =>{
    setTarget(event.target.value);
  };

  const handleClick = (event) =>{
//    after button is clicked all forrex info should be displayed from backend

    const fetchData = async() => {
        if (currTarget !== null && currSource !== null) {
            axios({
                "method": "GET",
                "url": "https://api.exchangeratesapi.io/latest?base=" + currSource,
            })
                .then((response) => {
                    dispatch(setCurrency({srcCurrency: currSource, tarCurrency: currTarget}));
                    setRate(response.data.rates)
                    // console.log(rate)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        else {
            alert("Please select source and target currency");
        }

    }
    fetchData();

    // setGraphSource(currSource);
    // setGraphTarget(currTarget);
  };


  const classes = useStyles();

  return (
    <div className="main_app">

       {/* <div className={classes.currency_app}> */}

        <FormControl className={classes.formControl}>
        <InputLabel id="Source-Inputlabel">Source Currency</InputLabel>
        <Select
          labelId="Source-label"
          id="Source-id"
          open={openS}
          onClose={handleCloseS}
          onOpen={handleOpenS}
          value={currSource}
          onChange={SourceClick}
        >
          {
              mycode.map(code => (
                <MenuItem value={code}>{code}</MenuItem>
              ))
          }
        </Select>
      </FormControl>
        
        {""}
        
       

      <FormControl className={classes.formControl}>
        <InputLabel id="Target-Inputlabel">Target Currency</InputLabel>
        <Select
          labelId="Target-label"
          id="Target-id"
          open={openT}
          onClose={handleCloseT}
          onOpen={handleOpenT}
          value={currTarget}
          onChange={TargetClick}
        >
          {
              mycode.map(code => (
                <MenuItem value={code}>{code}</MenuItem>
              ))
          }
        </Select>
      </FormControl>

      <div>
     <StyledButton id="button_div" onClick={handleClick}  variant="outlined" color="default">Submit</StyledButton>
     </div>
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
