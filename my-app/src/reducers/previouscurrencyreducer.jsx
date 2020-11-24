import React from "react";
import axios from "axios";

const previouscurrencyreducer = async (state = {}, action) => {
    switch (action.type) {
        case "setPreviousCurrency": {


            return ({
                src: action.src,
                tar: action.tar
            });
        }
        default: {
            return state;
        }
    }
};

export default previouscurrencyreducer;
