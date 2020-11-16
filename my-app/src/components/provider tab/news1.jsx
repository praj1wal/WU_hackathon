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



function News() {

  const [abc , setAbc] = useState();
  useEffect(() => {

      const fetchData=async ()=> {

          const response = await axios.get("https://finnhub.io/api/v1/news?category=forex&token=bun3n7748v6ubkqm42hg");
          setAbc(response.data);

      }
      fetchData().then(()=>console.log("hi there"));
    },[]);


    const useStyles = makeStyles({
      root: {
        maxWidth: 490,
      },
      newsStyles:{
        overflowY: 'scroll',
      }
    });
    const classes = useStyles();

  return (
  
    <div className={classes.newsStyles}>
      
     
      {console.log(" hiiiii ",abc)}
      
      {
          abc!=undefined && abc.map(function(key,index)
          {
            if( key.image!==undefined)  
          return (
        //   <li>{key.headline}</li>
       <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={key.category}
            height="140"
            image={key.image}
            title={key.category}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {key.headline}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
          )
          })
      }
      </div> 
  );
}

export default News;
