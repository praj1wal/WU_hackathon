import React,{useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
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
    legend: "none",
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

    const currencies= useSelector(state=>state.currencyreducer);

   const handleClick =(event) =>{

    const fetchData = async() => {

        const srcCurrency=currencies.srcCurrency;
        const tarCurrency=currencies.tarCurrency;
        const response = await axios.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:"+srcCurrency+"_"+tarCurrency+"&resolution=D&from=1569888000&to=1602460800&token=bun19kv48v6pkdmogb80")
        console.log("Inside Graph =  ",response.data);
        let o = response.data.o;
        let c = response.data.c;
        let l = response.data.l;
        let h = response.data.h;
        let t = response.data.t;
        let tmp=[];
        let date,unixTime;
        l.map((props,index) => {
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
        console.log(data);
        console.log(date.toLocaleDateString("en-IN"));
        setChartValue(true);
        //console.log(pastGraph)
      };

      fetchData();

    }

    return(
        <div>
         {ChartValue===true && <Chart
          chartType="CandlestickChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />}

       <Button onClick={handleClick}> click here </Button>
        </div>
    )
}

export default Pastgraph;
