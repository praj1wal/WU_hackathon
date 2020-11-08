import './App.css';
import { Button, Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core'
import React from "react";

function App() {
  return (
    <div className="App">
       <Grid container spacing={2}>
          <Grid item xs={12} style={{"height":300}}>
              <Card>

                  <CardContent>
                      <Button variant={"contained"} color={"secondary"}>
                  <Typography component={"h1"}>
                      Today's Statistics
                  </Typography>
                      </Button>
                  </CardContent>
              </Card>

          </Grid>

           <Grid item xs={8} >
               <Card>
               <CardContent>
                 <Button variant={"contained"} color={"secondary"}>
                  <Typography component={"h1"}>
                      Forex Provider List
                  </Typography>
                 </Button>
                  </CardContent>
              </Card>
           </Grid>

           <Grid item xs={4} style={{"height":300}}>
               <Card>
                   <CardContent>
                       <Button variant={"contained"} color={"primary"}>
                           <Typography component={"h1"}>
                               Future Prediction List
                           </Typography>
                       </Button>
                   </CardContent>
               </Card>
           </Grid>

           <Grid item xs={12}>
               <Card>
                   <CardContent>
                       <Button variant={"contained"} color={"secondary"}>
                           <Typography component={"h1"}>
                             Past Forex Data Graph
                           </Typography>
                       </Button>
                   </CardContent>
               </Card>

           </Grid>





       </Grid>
    </div>
  );
}

export default App;
