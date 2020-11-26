import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from '@material-ui/core';
import Chart from "react-google-charts";
import graph1 from './graphimage.PNG';
import { useMediaQuery } from 'react-responsive'




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
  legend: 'none',

  bar: { groupWidth: "50%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#207a87" }, // red
    risingColor: { strokeWidth: 0, fill: "#1976d2" } // green
  }
};

// const StyledButton1 = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     width: '80%',
//     height: '80%',
//     //padding: '0 30px',
//     marginRight: "10%",
//     marginLeft: "10%",
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);

function Pastgraph({ graph, setGraph }) {
  // let [ChartValue, setChartValue] = useState(false);
  let timeDuration;
  let [integer, setInteger] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const currencies = useSelector(state => state.currencyreducer);

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
      console.log("Inside Graph =  ", response.data);
      let o = response.data.o;
      let c = response.data.c;
      let l = response.data.l;
      let h = response.data.h;
      let t = response.data.t;
      let tmp = [];
      let date, unixTime, dummyint = 0;
      if (l === undefined) { alert('Oops ,Data for graph is not available !!') }
      else {
        l.map((props, index) => {
          dummyint++;
          unixTime = response.data.t[index];
          date = new Date(unixTime * 1000);
          tmp.push(date.toLocaleDateString("en-IN"));
          tmp.push(props);
          tmp.push(o[index]);
          tmp.push(c[index]);
          tmp.push(h[index]);
          //console.log(tmp);
          data.push(tmp);
          tmp = []
        })
        setInteger(dummyint);
        console.log("HI", data);
        // setChartValue(true);
        setGraph(true);
        //console.log(pastGraph)
      }
    };

    fetchData(e);

  }

  const mystyle = {
    background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
    borderRadius: 3,
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: '19%',
    height: '4vh',
    marginLeft: "1%",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  };
  const mystyle2 = {
    background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
    borderRadius: 3,
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: '30%',
    height: '30px',
    marginLeft: "1%",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  };
  const mystyle3 = {
    background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
    borderRadius: 3,
    borderRadius: 3,
    border: 0,
    color: 'white',
    width: '78%',
    height: '36px',
    //padding: '0 30px',
    marginRight: "10%",
    marginLeft: "10%",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    
  };

  return (

    <div >


      {(!isMobile) && <div>

        {graph === false &&
          <div >
            <div style={{ height: '47.7vh',filter: 'blur(3px)' }}>
              <Card variant="outlined" width='100%' height='40vh'>
                <CardContent>
                  <Typography variant="h4"> Past Graph</Typography>
                </CardContent>
                <CardContent>
                  {/* <Typography variant="h6"> Please Select The Currencies To Get The Desired Graph </Typography> */}
                  <img style={{ height: '28vh', width: '100vh' }} src={graph1} alt="logo" />
                </CardContent>

              </Card>
            </div>
            <button style={mystyle} value={7} onClick={handleClick}> Click Here </button>
          </div>
        }

        {graph === true && <div><Chart
          chartType="CandlestickChart"
          width='100%'
          height='47.5vh'
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

      </div>}

      {(isMobile) && <div>

        {graph === false &&
          <div >
            <div style={{ height: '250px', filter: 'blur(3px)' }}>
              <Card variant="outlined" width='100%' height='100%'>
                <CardContent>
                  <Typography variant="h4"> Past Graph</Typography>
                </CardContent>
                <CardContent>
                  {/* <Typography variant="h6"> Please Select The Currencies To Get The Desired Graph </Typography> */}
                  <img style={{ height: '130px', width: '100%' }} src={graph1} alt="logo" />
                </CardContent>

              </Card>
            </div>
            <button style={mystyle3} value={7} onClick={handleClick}> Click Here </button>
          </div>
        }

        {graph === true && <div><Chart
          chartType="CandlestickChart"
          width='100%'
          height='250px'
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

      </div>}
    </div>
  )
}

export default Pastgraph;
