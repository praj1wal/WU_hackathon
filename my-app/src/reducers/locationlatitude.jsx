import React from "react";

const locationlatitude=(state={},action)=>{
          switch (action.type) {
              case "setLocation":
              {
                  return{
                         latitude:action.payload.latitude,
                         longitude:action.payload.longitude
                       }
              }
              default:
                  return state;

          }

}
export default locationlatitude;
