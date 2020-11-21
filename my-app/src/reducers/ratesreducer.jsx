import React from "react";

const ratesreducer = (state = {}, action) => {
    switch (action.type) {
        case "setRates": {
            return (
                {
                    ...state,
                    payload:action.payload
                }
            );
        }
        default: {
            return state;
        }
    }

};

export default ratesreducer;
