import React, { useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import axios from "axios";
import jwt_decode from "jwt-decode";


const useStyles = makeStyles((theme) => ({

    div1:{
        width:'inherit',
        backgroundColor:'#91D5AD',
        height:'10%',
        overflow:'hidden'
    },
    button1:{
        backgroundColor:'#2EB837',
        color:'white',
        fontFamily: 'Righteous',
        fontSize: 'larger',
        fontWeight: 'bold',
        height: '55px',
        borderRadius: '5%',
        marginLeft: '40%',
        marginTop:'60px',
        padding: '5% 10%',
        fontSize: '1.6em',
        lineHeight: '1.35',
        borderRadius: '50px',
        '&:hover' :{
            color:'white',
            
            backgroundColor:'#3eba7b'         
          },
    },
    h5:{
        marginBottom: '1em',
        fontFamily:'Indie Flower',
        fontSize: '1.4em'
    },
    button2:{
        backgroundColor:'#2EB837',
        color:'white',
        fontFamily: 'Righteous',
        fontSize: 'larger',
        padding: '2% 3%',
        borderRadius: '2em',
        marginLeft: '7em',
        marginTop: '1em',
        marginBottom: '2em',
        
         '&:hover' :{
            color:'white',
            backgroundColor:'#3eba7b'         
          },
    }

}));
export default function DoctorHome() {
    const classes = useStyles();
    const [name, setname] = useState('');
    const [Email,setEmail]=useState('');
    const [Country,setCountry] = useState('');
    const [Speciality,setSpeciality]=useState('');
    const [image,setimage]=useState('');


        let user={};
    function getUserDetails() {
        let token = localStorage.getItem("jwt");
        var decoded = jwt_decode(token);
        user = decoded;
        setname(user.name);
        setEmail(user.email);
        setCountry(user.country);
        setSpeciality(user.speciality);
        setimage(user.image);
      };

      useEffect(() => {
        getUserDetails();
        console.log(user)
            
    }); // <- Add dependencies here
    return ( 
        <Grid container component="main" className={classes.root}>
            
            <div className={classes.div1}>
            <Row>
                <Col md={3}>
                    <img alt="" src="/doctor1.png"/>
                </Col>
                <Col xs={10} md={5} style={{paddingTop: '7em',paddingLeft: '2em'}}>
                    <h2 style={{fontFamily:'Heroes Legend',color:'white',width: '110%',fontSize: '340%',textShadow: '0px 0px 6px black'}}>Build Your Medical Checklist Now!</h2>
                    <Link style={{textDecoration:'none'}} to="/Step1">
                        <Button variant="primary" type="submit" className={classes.button1}>Create</Button>
                    </Link>
                </Col>
                <Col md={3}>
                <img alt="" src="/doctor2.png" style={{marginTop:'90px',width:'598px'}}/>
                </Col>
            </Row>    
            </div>
            <div className={classes.div1} style={{backgroundColor:'#91E6AD'}}>
                    <Row>
                        <Col md={5}>
                          <img alt="" src="doctor3.jpg" style={{borderRadius: '15em',float:'right',marginTop:'2em',width: '27em'}} />
                          
                        </Col>
                        <Col md={7} key={user.id}>
                        <h3 style={{fontFamily:'Indie Flower',paddingTop: '1em',paddingLeft: '2em',fontSize:'40px'}}>Dr. {name}</h3>
                        <h4 style={{fontFamily: 'Nova Flat',color: 'white',textShadow: '0 0 3px black',paddingLeft: '2em',fontSize: '60px'}}>Info</h4>
                        <div style={{paddingLeft: '8em',paddingTop: '1em'}}>
                            <h5 className={classes.h5}>Email : {Email}</h5>
                            <h5 className={classes.h5}>Country : {Country}</h5>
                            <h5 className={classes.h5}>Speciality: {Speciality}</h5>
                        </div>
                        <Link style={{textDecoration:'none'}} to="/Edit">
                            <Button variant="primary" type="submit" className={classes.button2}>Edit Profile</Button>
                        </Link>
                        </Col>
                    </Row>
            </div>
            <div className={classes.div1} style={{backgroundColor:'#aaf3ad'}}>
                <Row>
                    <Col md={10}>
                    <div style={{maxWidth: 'max-content',margin: 'auto'}}>
                    <h2 style={{fontFamily:'heroes legend',color:'white',float: 'right',marginTop: '2em',fontSize: '310%',textShadow: '-3px 4px 0px black'}}>See All Your Checklists</h2>
                    <Link style={{textDecoration:'none'}} to="/Signup">
                        <Button variant="primary" type="submit" className={classes.button1} style={{padding: '3% 4%',marginLeft:'50%',width: '25%',height: '2.7em',fontSize:'2.5em'}}>Show</Button>
                    </Link>
                    </div>
                    </Col>

                    <Col md={2}>
                        <img alt="" src="register.png" style={{width: '250px',float:'right',marginTop: '4.5em',marginRight: '7em'}}></img>
                    </Col>
                </Row>
            </div>
            <div className={classes.div1} style={{backgroundColor:'#5bf0a6'}}>
                <Row>
                    <Col md={3}>
                        <img alt="" src="client.png" style={{width: '270px',paddingTop: '8em'}}></img>
                    </Col>
                    <Col md={6}>
                        <div>
                            <h2 style={{fontFamily:'heroes legend',marginTop: '2em',fontSize: '290%',color: 'white',textShadow: '-3px 4px 0 black',wordSpacing: '0.06em',lineHeight: '1.4em',maxWidth: '700px',marginLeft:'auto'}}>Go Through All Users History</h2>
                            <Link style={{textDecoration:'none'}} to="/Signup">
                            <Button variant="primary" type="submit" className={classes.button1} style={{padding: '3% 4%',width: '10em' ,height: '2.7em',fontSize:'2em'}}>Explore</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>

        </Grid>
    )
}