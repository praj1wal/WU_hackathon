import React,{useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';

import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';


  const data = [
    [
      {
        type: "string",
        id: "Date"
      },
      {
        type: "number",
        label: "Something"
      },
      {
        type: "number",
        label: "Something"
      },
      {
        type: "number",
        label: "Something"
      },
      {
        type: "number",
        label: "Something"
      }
    ],
    ["Mon", 20, 28, 38, 45],
    ["Tue", 31, 38, 55, 66],
    ["Wed", 50, 55, 77, 80],
    ["Thu", 77, 77, 66, 50],
    ["Fri", 68, 66, 22, 15]
  ];


function Pastgraph({graphSource,graphTarget})
{

   const [pastGraph, setPastGraph] = useState([]);


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
        const response = await axios(`https://finnhub.io/api/v1/forex/candle?symbol=OANDA:EUR_USD&resolution=D&from=1572651390&to=1575243390&token=bun19kv48v6pkdmogb80`)
        console.log(response.data);
      };
      fetchData();

    }

    return(
        <div>
         <Chart
          chartType="CandlestickChart"
          width="100%"
          height="400px"
          data={data}
        />

       <Button onClick={handleClick}> click here </Button>
        </div>
    )
}

export default Pastgraph;