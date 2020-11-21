import React from "react";
import locationlatitude from "./locationlatitude";
import {combineReducers} from "redux";
import newsreducer from "./newsreducer";
import currencyreducer from "./currencyreducer";
import ratesreducer from "./ratesreducer";
const reducers=combineReducers({
    locationlatitude,
    newsreducer,
    currencyreducer,
    ratesreducer

});

export default reducers;
