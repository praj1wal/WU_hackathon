import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, withStyles } from '@material-ui/core';

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '80%',
        height: '80%',
        //padding: '0 30px',
        marginRight: "10%",
        marginLeft: "10%",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function Prediction() {

    let [mlData, setMlData] = useState('');
    let [mlState, setMlState] = useState(false);

    const handleClick = () => {
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/predict/");
            setMlData(response.data)
            console.log("This is our great prediction", mlData);
            setMlState(true)
        };
        fetchData()
    }
    return (
        <div >
            <Card style={{ height: '40vh' }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
              Prediction
            </Typography>
                    {mlState === false && <Typography gutterBottom variant="h6" component="h2">
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData > 0.35 ? <h1>bullish</h1> : <h1>bearish</h1>)}</Typography>
                </CardContent>

            </Card>
            <StyledButton onClick={handleClick}>Predict Me</StyledButton>
        </div>


    );
}