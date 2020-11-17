import React from "react";


const currencyreducer=(state={},action)=>{
    switch (action.type) {
        case "currency":{
            return(
                {
                    srcCurrency:action.srcCurrency,
                    tarCurrency:action.tarCurrency
                }
            );
        }
        default:
            return state;
    }

}


export default currencyreducer;
