import React from "react";
import locationlatitude from "./locationlatitude";
import {combineReducers} from "redux";
import newsreducer from "./newsreducer";
import currencyreducer from "./currencyreducer";
const reducers=combineReducers({
    locationlatitude,
    newsreducer,
    currencyreducer

});

export default reducers;
