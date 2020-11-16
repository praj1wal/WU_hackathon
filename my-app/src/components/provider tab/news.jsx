import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import setNews from "../actions/setNews";



function News() {

  const [abc , setAbc] = useState();
  const dispatch=useDispatch();
  const data=useSelector(state=>state.newsreducer);
  setAbc(data);
  useEffect(() => {

      const fetchData=async ()=> {

          const response = await axios.get("https://finnhub.io/api/v1/news?category=forex&token=bun3n7748v6ubkqm42hg");
          const res1 = response.data;
          dispatch(setNews({payload: res1}));

      }
      fetchData().then(()=>console.log("hi there"));
    },[]);


    const useStyles = makeStyles({
      root: {
        maxWidth: 490,
      },
    });
    const classes = useStyles();

  return (
  
    <div>
      {/* {data!==undefined & data.map((d)=>{
      //   <Card className={classes.root}>
      //   <CardActionArea>
      //     <CardMedia
      //       component="img"
      //       alt="Contemplative Reptile"
      //       height="140"
      //       image="/static/images/cards/contemplative-reptile.jpg"
      //       title="Contemplative Reptile"
      //     />
      //     <CardContent>
      //       <Typography gutterBottom variant="h5" component="h2">
      //         Lizard
      //       </Typography>
      //       <Typography variant="body2" color="textSecondary" component="p">
      //         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
      //         across all continents except Antarctica
      //       </Typography>
      //     </CardContent>
      //   </CardActionArea>
      //   <CardActions>
      //     <Button size="small" color="primary">
      //       Share
      //     </Button>
      //     <Button size="small" color="primary">
      //       Learn More
      //     </Button>
      //   </CardActions>
      // </Card>
  
      
      })} */}
      <h1>Hellooooo</h1>
     
      {console.log(" hiiiii ",abc)}
      </div> 
  );
}

export default News;
