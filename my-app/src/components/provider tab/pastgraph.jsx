import React,{useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';

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


function Pastgraph({graphSource,graphTarget})
{

   let [pastGraph, setPastGraph] = useState(data);

   let [ChartValue, setChartValue] = useState(false);
  

   const handleClick =(event) =>{

    const fetchData = async() => {
        // axios({
        //   "method": "GET",
        //   "url": "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-01-01&symbols=USD,JPY"
        // })
        // .then((response) => {
        //   setPastGraph(response.data.rates)
        //   console.log("HIIIII",pastGraph)
        // })
        // .catch((error) => {
        //   console.log(error)
        // })
        const response = await axios.get(`https://finnhub.io/api/v1/forex/candle?symbol=OANDA:EUR_USD&resolution=D&from=1569888000&to=1602460800&token=bun19kv48v6pkdmogb80`)
       // console.log(response.data);
        //for(var i=0;i<response.data.t.length;i++){
          //    setPastGraph(...pastGraph,[response.data.t[i],response.data.l[i],response.data.o[i],response.data.c[i],response.data.h[i]])
            //  console.log(response.data.t[i],response.data.l[i],response.data.o[i],response.data.c[i],response.data.h[i]);
        //}
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