import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl, Grid, Select} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import setCurrency from "../actions/setCurrency";
import InputLabel from '@material-ui/core/InputLabel';
import {useDispatch} from "react-redux";
import setRates from "../actions/setRates";
import {useTheme} from '@material-ui/core/styles';


var codes = ["USD", "INR", "GBP", "EUR", "AUD", "JPY", "HRK", "RUB", "CHF", "CAD"];

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

const useStyles = makeStyles((theme) => ({

  currency_app: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },

}));

function SelectCurrency() {

    const dispatch = useDispatch();
    const [mycode, setCodes] = useState(codes);
    const [currSource, setCurr] = useState('EUR');

    const [currTarget, setTarget] = useState('GBP');

    const [openS, setOpenS] = useState();
    const [openT, setOpenT] = useState();

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

    const TargetClick = (event) => {
        setTarget(event.target.value);
    };

    const handleClick = (event) => {
        //    after button is clicked all forrex info should be displayed from backend

        const fetchData = async () => {
            if (currTarget !== null && currSource !== null) {

                const response = await axios.get("https://api.exchangeratesapi.io/latest?base=" + currSource);
                let val=response.data.rates;
                await dispatch(setRates({payload:val}));
                await dispatch(setCurrency({srcCurrency: currSource, tarCurrency: currTarget}));

            } else {
                alert("Please select source and target currency");
            }

        }
        fetchData();
    };


    const classes = useStyles();

    return (
        <div className="main_app" style={{ height: '10vh', width: '100%' }}>

      {/* <div className={classes.currency_app}> */}
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
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
      </Grid>

            


          <Grid item xs={12} sm={4}>
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
      </Grid>
      <Grid item xs={12} sm={4}>
      <span style={{ alignContent: "center" }}>
        <StyledButton id="button_div" onClick={handleClick} variant="outlined" color="default">Submit</StyledButton>
      </span>
      </Grid>
      </Grid>

        {/* <Grid container spacing={3}>
          {
            Object.keys(rate).filter(t => codes.includes(t)).map(function (key, index) {
              if (rate[key] != 1)

                return <Grid item xs={4}>
                  <Card className={classes.root} variant="outlined">
                    <Typography gutterBottom variant="h5" component="h2">
                      {key}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h1">
                      {Math.round(rate[key]*100)/100}
                    </Typography></Card>
                </Grid>;
            })
          }
        </Grid> */}

            {/*</div>*/}
        </div>
    );
}

export default SelectCurrency;
