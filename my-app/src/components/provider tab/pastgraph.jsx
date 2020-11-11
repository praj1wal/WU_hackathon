import React,{useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';


  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
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
        const response = await axios(`https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-01-01&symbols=USD,INR`)
        console.log(response.data);
      };
      fetchData();

    }

    return(
        <div>
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
        <ReferenceLine y={9800} label="Max" stroke="red" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
       

       <Button onClick={handleClick}> click here </Button>
        </div>
    )
}

export default Pastgraph;