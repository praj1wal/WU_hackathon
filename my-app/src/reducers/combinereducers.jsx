import React from "react";
import locationlatitude from "./locationlatitude";
import {combineReducers} from "redux";
import newsreducer from "./newsreducer";
import currencyreducer from "./currencyreducer";
import ratesreducer from "./ratesreducer";
import pastgraphreducer from "./pastgraphreducer";
import previouscurrencyreducer from "./previouscurrencyreducer";
const reducers=combineReducers({
    locationlatitude,
    newsreducer,
    currencyreducer,
    ratesreducer,
    pastgraphreducer,
    previouscurrencyreducer
});

export default reducers;
