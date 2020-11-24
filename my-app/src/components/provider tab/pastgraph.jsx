import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from '@material-ui/core';
import Chart from "react-google-charts";
import graph from './graphimage.PNG';



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
  legend: { position: 'top' },

  bar: { groupWidth: "50%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#207a87" }, // red
    risingColor: { strokeWidth: 0, fill: "#1976d2" } // green
  }
};

function Pastgraph() {
  // let [ChartValue, setChartValue] = useState(false);
   let ChartValue=false;
  let timeDuration;
  let [integer, setInteger] = useState(0);
  const currencies = useSelector(state => state.currencyreducer);
  let pastgraphdata=useSelector(state=>state.pastgraphreducer);
  pastgraphdata=pastgraphdata.payload;
  // let data=[];

  const foo=(pastgraphdata)=>{
    if(pastgraphdata!==undefined)
    {
      console.log("Inside past graph component");
      let o = pastgraphdata.o;
      let c = pastgraphdata.c;
      let l = pastgraphdata.l;
      let h = pastgraphdata.h;
      let t = pastgraphdata.t;
      let tmp = [];
      let unixTime, dummyint = 0;
      l.map((props, index) => {
        dummyint++;
        unixTime = pastgraphdata.t[index];
        let date = new Date(unixTime * 1000);
        tmp.push(date.toLocaleDateString("en-IN"));
        tmp.push(props);
        tmp.push(o[index]);
        tmp.push(c[index]);
        tmp.push(h[index]);
        data.push(tmp);
        tmp = []
      })
      // setInteger(dummyint);

    }
    // for (let i = 0; i < integer; i++) {
    //   data.pop();
    // }
  }
  foo(pastgraphdata);
  ChartValue=true;

  const handleClick = (e) => {
    console.log("Inside handle click");
    const fetchData = async (e) => {

      for (let i = 0; i < integer; i++) {
        data.pop();
      }
      let d = new Date();
      const month = d.getMonth();
      const date1 = d.getDate();
      const year = d.getFullYear();
      let datum = new Date(Date.UTC(year, month, date1, '00', '00', '00'));
      timeDuration = e.target.value;
      console.log("timedur=", timeDuration);


      let pastdatum = new Date(Date.UTC(year, month, (date1 - timeDuration + 1), '00', '00', '00'));

      let a = (datum.getTime()) / 1000;
      let b = (pastdatum.getTime()) / 1000;
      let no1 = Number(a);
      let no2 = Number(b);
      // console.log(no1," ",no2);
      const srcCurrency = currencies.srcCurrency;
      const tarCurrency = currencies.tarCurrency;
      const response = await axios.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:" + srcCurrency + "_" + tarCurrency + "&resolution=D&from=" + no2 + "&to=" + no1 + "&token=bun19kv48v6pkdmogb80")
      // console.log("Inside Graph =  ", response.data);
      let o = response.data.o;
      let c = response.data.c;
      let l = response.data.l;
      let h = response.data.h;
      let t = response.data.t;
      let tmp = [];
      let date, unixTime, dummyint = 0;
      l.map((props, index) => {
        dummyint++;
        unixTime = response.data.t[index];
        date = new Date(unixTime * 1000);
        tmp.push(date.toLocaleDateString("en-IN"));
        tmp.push(props);
        tmp.push(o[index]);
        tmp.push(c[index]);
        tmp.push(h[index]);
        data.push(tmp);
        tmp = []
      })
      setInteger(dummyint);
      // console.log("HI", data);
      // setChartValue(true);
      //console.log(pastGraph)
    };

    fetchData(e);

  }

  const mystyle = {
    background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: '19%',
    height: '4vh',
    marginLeft: "1%",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  };

  return (
    <div>
      {console.log("inside return of the pastgraph ",data)}
      {ChartValue === false &&
        <div >
          <div style={{height:'46.5vh', filter:'blur(3px)'}}>
          <Card variant="outlined" width='100%' height='40vh'>
            <CardContent>
              <Typography variant="h4"> Past Graph</Typography>
            </CardContent>
            <CardContent>
              {/* <Typography variant="h6"> Please Select The Currencies To Get The Desired Graph </Typography> */}
              <img style={{height:'28vh',width:'100vh'}} src={graph} alt="logo" />
            </CardContent>

          </Card>
          </div>
          <button style={mystyle} value={7} onClick={handleClick}> Click Here </button>
        </div>
      }

      {ChartValue === true && <div><Chart
        chartType="CandlestickChart"
        width='100%'
        height='42vh'
        data={data}
        options={options}
        loader={<h1><center>Loading Chart</center></h1>}

      />
        {/*<ButtonGroup variant="contained" fullWidth color="primary" aria-label="contained primary button group">*/}
        <button style={mystyle} value={1} onClick={handleClick}>1 Day</button>
        <button style={mystyle} value={7} onClick={handleClick}>1 Week</button>
        <button style={mystyle} value={30} onClick={handleClick}>1 Month</button>
        <button style={mystyle} value={180} onClick={handleClick}>6 Month</button>
        <button style={mystyle} value={365} onClick={handleClick}>1 Year</button>

        {/*<Button value={7} onClick={()=>{setTimeDuration(7);}}>7 Day</Button>*/}
        {/*<Button value={30} onClick={()=>{setTimeDuration(30);}}>1 Month</Button>*/}
        {/*<Button value={180} onClick={()=>{setTimeDuration(180);}}>6 Month</Button>*/}
        {/*<Button value={360} onClick={()=>{setTimeDuration(360);}}>1 Year</Button>*/}
        {/*</ButtonGroup>*/}
      </div>
      }

    </div>
  )
}

export default Pastgraph;
