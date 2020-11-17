const setCurrency=(props)=>{
    return({
        type:"currency",
        srcCurrency:props.srcCurrency,
        tarCurrency:props.tarCurrency
    });

}


export default setCurrency;
