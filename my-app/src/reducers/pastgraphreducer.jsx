import React from "react";

const pastgraphreducer = (state = {}, action) => {
    switch (action.type) {
        case "setPastGraph": {
            return (
                {
                    payload: action.payload
                }
            );
        }
        default: {
            return state;
        }
    }


};
export default pastgraphreducer;
