import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, AppBar, Toolbar} from '@material-ui/core';
import graph1 from './graphimage.PNG';
import fxpig from './FXPIG.png';
import Oanda from './Oanda.png';
import FXCM from './fxcm.png';
import forexcom from './forexcom.png';
import Icmtrader from './icmtrader.jpg';
import Icmarket from './icmarket.png';
import Octafx from './octafx.jpg';
import Paperstone from './paperstone.jpg';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function Innovation() {
    const classes = useStyles();

    return (
        <Grid container >
            <Grid item xs={12} sm={12}>
                <AppBar position="static" style={{ backgroundColor: "#53bbc9" }}>
                    <Toolbar>
                        <Typography variant="h6">
                            Forex Trading Platform
                            </Typography>
                        {/* <div className={classes.toolbarButtons}> */}
                        {/* <NavLink to="/tracker" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            ASSET TRACKER
                        </NavLink> */}
                        {/* <NavLink to="/" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            <b>HOME</b>
                        </NavLink> */}
                        {/* </div> */}
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            height='100px'
                            className={classes.media}
                            image={Oanda}
                            title="oanda"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Oanda
          </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            We have 24 years' experience in financial trading and offer pricing on a wide range of global CFD instruments. Access tight spreads via the powerful MetaTrader 4 trading platform.
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            
                            <a href='https://www.oanda.com/bvi-en/'>Visit Website</a>
        </Button>
                       
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={FXCM}
                            title="FXCM"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                FXCM
        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            FXCM is a leading provider of online foreign exchange (FX) trading, CFD trading, spread betting and related services. Founded in 1999, the company's mission is to provide global traders with access to the world's largest and most liquid market by offering innovative trading tools, hiring excellent trading educators, meeting strict financial standards.
        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://www.fxcm.com/markets/'>Visit Website</a>
      </Button>
                        
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={forexcom}
                            title="forex.com"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Forex.com
      </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            FOREX.com offers forex & metals trading with award winning trading platforms, tight spreads, quality executions, powerful trading tools & 24-hour live support.

      </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://www.forex.com/en/'>Visit Website</a>
    </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Icmtrader}
                            title="icmtrader"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Icmtrader
          </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Our goal is to provide traders at every level of experience and from all over the world with a professional, convenient and safe trading environment.
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://icmtrading.io/'>Visit Website</a>
        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Icmarket}
                            title="ic markets"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Ic markets
        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Raw Spreads are the difference you’ve been waiting for. Trade with spreads from 0.0 pips*, no requotes, best possible prices and no restrictions. IC Markets is the online Forex CFD provider of choice for high volume traders, scalpers and robots.
        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://www.icmarkets.com/global/en'>Visit Website</a>
      </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Octafx}
                            title="Octafx"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Octafx
      </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            We build here an economical trading experience, whereby forex traders, both new or experienced, can make the most profit by investing equally.
      </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://hi.octafx.com/'>Visit Website</a>
    </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={fxpig}
                            title="Fxpig"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Fxpig
          </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            FXPIG™ is not your typical broker. It is based upon 3 simple principles of offering clients Transparent Pricing and Execution using the Best Technology with the Best Customer Support…while having a lot of fun doing it.
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://www.fxpig.com/'>Visit Website</a>
        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: "2%" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Paperstone}
                            title="Pepperstone"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Pepperstone
        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            At Pepperstone, we know what it’s like to trade. With the scale of a global fintech and the agility of a start-up, we’re here to arm you with everything you need to take on the global markets with confidence.
        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        <a href='https://pepperstone.com/en/'>Visit Website</a>
      </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
