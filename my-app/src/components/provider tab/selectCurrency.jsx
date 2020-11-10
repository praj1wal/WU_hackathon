import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl,Select} from '@material-ui/core';
import axios from 'axios';


var codes = ["USD","INR","GBP","EUR","BHD","OMR","JOD","KYD","CHF","CAD"];
function SelectCurrency() {
  
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
    setCurr(null);
    setTarget(null);
    const fetchData = async() => {
      axios({
        "method": "GET",
        "url": "https://api.exchangeratesapi.io/latest?base="+ currSource,
      })
      .then((response) => {
        setRate(...rate,response.data.rates)
      })
      .catch((error) => {
        console.log(error)
      })
    };
    fetchData();  
  };

 

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
       {/* {rate!==[] && rate.forEach((props)=>{
         <h1>{props}</h1>
       })} */}
       {rate.CAD}
    </div>
  );
}
export default SelectCurrency;