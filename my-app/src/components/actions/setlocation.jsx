const setlocation=(props)=>{
    // console.log("Action called",props);
    return({
        type:"setLocation",
        payload:props.payload
    });
}

export default setlocation;
