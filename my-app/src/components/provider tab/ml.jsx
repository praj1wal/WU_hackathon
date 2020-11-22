import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent,Typography } from '@material-ui/core';

export default function Prediction() {

    let [mlData, setMlData] = useState('');
    const handleClick = () => {
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/predict/");
            setMlData(response.data)
            console.log("This is our great prediction",mlData);
        };
        fetchData()
    }
    return (
        <div>
            <Card>
                <CardContent>
    <Typography>{mlData}</Typography>
                </CardContent>
            </Card>
            <Button onClick={handleClick}>Predict Me</Button>
        </div>

    );
}