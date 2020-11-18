import React,{useState} from 'react';
import axios from 'axios';
import {Button, ButtonGroup} from '@material-ui/core';
import {useSelector} from "react-redux";

import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';


  let data = [
    [
      {
        type: "string",
        id: "Date"
      },
      {
        type: "number",

      },
      {
        type: "number",

      },
      {
        type: "number",

      },
      {
        type: "number",

      }
    ],
    // ["Mon", 20, 28, 38, 45],
    // ["Tue", 31, 38, 55, 66],
    // ["Wed", 50, 55, 77, 80],
    // ["Thu", 77, 77, 66, 50],
    // ["Fri", 68, 66, 22, 15]
  ];
  const options = {
    title: 'Past Graph',
    hAxis: {
      title: 'Date',
    },
    vAxis: {
      title: 'Rate',
    },
    animation: {
      startup: true,
      easing: 'linear',
      duration: 2000,
    },
    legend: { position: 'top'},

    bar: { groupWidth: "50%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" } // green
    }
  };


function Pastgraph()
{

   let [pastGraph, setPastGraph] = useState(data);

   let [ChartValue, setChartValue] = useState(false);

   let [timeDuration, setTimeDuration] = useState(2);

    let [integer, setInteger] = useState(0);
  
    const currencies= useSelector(state=>state.currencyreducer);

   const handleClick =(event) =>{

    const fetchData = async() => {

        for(let i=0;i<integer;i++){
          data.pop();
        }
            let d = new Date();
            const month = d.getMonth();
            const date1 = d.getDate();
            const year = d.getFullYear();
            let datum = new Date(Date.UTC(year, month, date1, '00', '00', '00'));
            console.log("timedur=",timeDuration)
            let pastdatum = new Date(Date.UTC(year, month, (date1 - timeDuration+1), '00', '00', '00'));

            let a = (datum.getTime()) / 1000;
            let b = (pastdatum.getTime()) / 1000;
            let no1 = Number(a);
            let no2 = Number(b);
           // console.log(no1," ",no2);
        const srcCurrency=currencies.srcCurrency;
        const tarCurrency=currencies.tarCurrency;
        const response = await axios.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:"+srcCurrency+"_"+tarCurrency+"&resolution=D&from=" + no2 + "&to=" + no1 + "&token=bun19kv48v6pkdmogb80")
        console.log("Inside Graph =  ",response.data);
        let o = response.data.o;
        let c = response.data.c;
        let l = response.data.l;
        let h = response.data.h;
        let t = response.data.t;
        let tmp=[];
        let date,unixTime,dummyint=0;
        l.map((props,index) => {
            dummyint++;
            unixTime = response.data.t[index];
            date = new Date(unixTime*1000);
            tmp.push(date.toLocaleDateString("en-IN"));
            tmp.push(props);
            tmp.push(o[index]);
            tmp.push(c[index]);
            tmp.push(h[index]);
            //console.log(tmp);
            data.push(tmp);
            tmp=[]
        } )
        setInteger(dummyint);
        console.log("HI",data);
        setChartValue(true);
        //console.log(pastGraph)
      };

      fetchData();

    }

    return(
        <div>
         {ChartValue===true && <div><Chart
          chartType="CandlestickChart"
          width={800}
          height={300}
          data={data}
          options={options}
          loader={<div>Loading Chart</div>}

        />
        <ButtonGroup variant="contained" fullWidth color="primary" aria-label="contained primary button group">
          <Button onClick={()=>{setTimeDuration(1);}}>1 Day</Button>
          <Button onClick={()=>{setTimeDuration(7);}}>7 Day</Button>
          <Button onClick={()=>{setTimeDuration(30);}}>1 Month</Button>
          <Button onClick={()=>{setTimeDuration(180);}}>6 Month</Button>
          <Button onClick={()=>{setTimeDuration(360);}}>1 Year</Button>
        </ButtonGroup>
        </div>
        }
        
       <Button onClick={handleClick}> click here </Button>
        </div>
    )
}

export default Pastgraph;
