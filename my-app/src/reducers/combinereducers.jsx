import React from "react";
import locationlatitude from "./locationlatitude";
import {combineReducers} from "redux";
import newsreducer from "./newsreducer";

const reducers=combineReducers({
    locationlatitude,
    newsreducer

});

export default reducers;
