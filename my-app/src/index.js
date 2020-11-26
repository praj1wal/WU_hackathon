import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import{ Provider} from "react-redux";
import reducers from "./reducers/combinereducers";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Innovation from "./components/provider tab/innovation";
const store=createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <Provider store={store}>
       <Router>
           <Route exact path={'/'} component={App}></Route>
           <Route exact path={'/providers'} component={Innovation}></Route>

           <Switch>
    <React.StrictMode>
     {/*<App />*/}
   </React.StrictMode>
          </Switch>

      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
