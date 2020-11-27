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
import ScrollArea from 'react-scrollbar';
import Scrollbar from 'react-scrollbars-custom'
import NewReleasesIcon from '@material-ui/icons/NewReleases'; // for news


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
        //maxWidth: 490 ,
      },
      newsStyles:{
        // overflowY: 'scroll',
        // flex: 1
      }
    });
    const classes = useStyles();

  return (

    <div className={classes.newsStyles}>
      
            <Typography gutterBottom variant="h5" component="h2">
            <NewReleasesIcon/> Today's News
            </Typography>
           
       <Scrollbar style={{ width: '100%', height: '42vh' }}>
  
      {console.log(" hiiiii ",abc)}
      
      {
          abc!=undefined && abc.map(function(key,index)
          {
            if( key.url.search("forexlive") === -1)  
          return (
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
            <a href={key.url}>Learn More</a>
          </Button>
        </CardActions>
      </Card>
          )
          })
      }
       </Scrollbar>      
      </div> 
     
  );
}

export default News;
