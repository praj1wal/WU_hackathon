import axios from "axios";

// const fetchdata=async(props)=>{
//     const response=await axios.get("https://forexproviderapi.herokuapp.com/forexprovider/?IN=" + props.srcCurrency + "&OUT=" + props.tarCurrency + "&TIME=7");
//     console.log("inside action = ",response.data);
// }
const setPreviousCurrency= (props)=>{
      // fetchdata(props);
    return(
         {
             type:"setPreviousCurrency",
             src:props.srcCurrency,
             tar:props.tarCurrency
         }
     )

}

export default setPreviousCurrency;
