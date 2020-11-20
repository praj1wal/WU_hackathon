import './App.css';
import { Button, Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core'
import React from "react";
import Comp from './components/components';
import News from './components/provider tab/news';
import News1 from './components/provider tab/news1';
function App() {
  return (
    <div className="App">
       <Grid container spacing={2}>
          <Grid item xs={12} style={{"height":100}}>
              <Card>

                  <CardContent>
                  <Typography component={"h1"}>
                      Amon9US Forex Aggregator
                  </Typography>
                  </CardContent>
              </Card>

          </Grid>

           <Grid item xs={9} >
               <Card>
               <CardContent>
                  <Comp/>
                  {/* <Typography component={"h1"}>
                      Forex Provider List
                  </Typography> */}
                  </CardContent>
              </Card>
           </Grid>

           <Grid item xs={3} style={{"height":300}}>
               {/* <Card>
                   <CardContent>
                       <Button variant={"contained"} color={"primary"}>
                           <Typography component={"h1"}>
                               Future Prediction List
                           </Typography>
                       </Button>
                   </CardContent>
               </Card> */}
               <News1 />
           </Grid>

           <Grid item xs={12}>
               <Card>
                   <CardContent>
                           {/* <Typography component={"h1"}>
                             Past Forex Data Graph
                           </Typography> */}
                   </CardContent>
               </Card>

           </Grid>





       </Grid>
    </div>
  );
}

export default App;
