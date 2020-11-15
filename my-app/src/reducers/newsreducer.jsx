import React from "react";

const newsreducer=(state=[],action)=>{

    switch (action.type) {
        case 'news': {
            return [...state,action.payload];
        }
        default:
            return state;
    }

};

export default newsreducer;
