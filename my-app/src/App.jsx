//import './App.css';
import { Button, Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core'
import React from "react";
import Comp from './components/components';
import News1 from './components/provider tab/news1';

import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";


function App() {
  return (
    <div className="App" style={{ backgroundColor: "#e3f2fd" }}>
       <Comp/>
    </div>
  );
}

export default App;
