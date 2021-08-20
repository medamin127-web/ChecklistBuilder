import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Select from "react-select"
import { useHistory } from "react-router-dom";



function shoot() {
  alert("Great Shot!");
}


const useStyles = makeStyles((theme) => ({

    root:{
        backgroundColor:'#91D5AD',
        height: '70px',
        overflow: 'visible'
    },

    button1:{
        backgroundColor:'#2EB837',
        color:'white',
        fontFamily:'Corbel',
        fontSize: 'larger',
        fontWeight: 'bold',
        height: '55px',
        borderRadius: '5%',
        marginTop: '6px',
        marginLeft: '15px',
        
    },
    img1:{
    width: '35px',
    height: '35px',
    marginTop: '17px',
    marginRight: '20px',
    
    },
    h33:{
        marginRight: '20px',
        color: 'white',
        fontSize: '1.6em',
        marginTop: '16px',
        textShadow: '1px 1px 2px black',
        fontFamily: 'system-ui',
        marginRight: '20px',
    },
      input1:{
            width: '200px',
            marginTop: '16px',
            borderRadius: '8px',
            marginRight: '10px',
      },
    link1:{
        color:'white',
        fontFamily: 'Inter',
        marginTop: '15px',
        marginRight: '132px',
         maxWidth: 'min-content',
        fontSize: '1em',
        lineHeight: '1.2',
        textAlign: 'center',
        
        '&:hover' :{
        textDecoration: "none",
        color:'white',
        maxWidth: 'min-content',
        textShadow: '1px 1px 2px black'

        
      },
       },
       div1:{
           marginRight:'50px',
           marginTop: '20px',
       }, 
       div2:{
           
       },
       link2:{
           color:'#2EB837',
           fontFamily: 'Julius Sans One',
           fontSize:'18px',
           textShadow: '0 1px 2px black',
           marginLeft:'20px',
           height: 'fit-content',
           marginTop: '17px',
           '&:hover' :{
            textDecoration: "none",
            color:'#2EB837',    
            fontFamily: 'Julius Sans One',
            height: 'fit-content',
            fontSize:'18px',
            textShadow: '0 1px 2px black',
            marginLeft:'20px', 
            borderBottom: '3px solid white',
            marginTop: '17px',   
      },

       },
      search:{
          width:'30px',
          height:'30px',
          marginTop:'20px',
          marginRight:'8px'
      },
      img2:{
        width: '17px',
        marginLeft: '5px',
        marginBottom: '3px',
        cursor:'pointer',
      },
      h22:{
        fontSize: '2em',
        color: 'white',
        marginTop: '13px',
        marginRight: '280px',
        marginLeft: '10px',
        fontFamily:'Julee',
        textShadow: '3px 1px 2px black',
      },
      img3:{
        width: '57px',
        marginTop:'5px',
        marginLeft: '10px',
      }
   
}));
export default function DoctorHome() { 
    const classes = useStyles();
    const history = useHistory(); 

    function logUserOut() {
      localStorage.removeItem("jwt");
      history.push("/Signup");
    }
        return (
            
               <Grid container component="main" className={classes.root}>
               <Link to="/DoctorHome"><img alt="" src="/Logo.png" className={classes.img3}></img></Link>
               <h2 className={classes.h22}>Site Name </h2>
               <div className={classes.div1}>
                <Link to="/DoctorHome" className={classes.link2}>Home</Link>
                <Link to="/about" className={classes.link2}>Build Checklist</Link>
                <Link to="/about" className={classes.link2}>Category</Link>
                <img alt="" src="/drop.png" className={classes.img2} onClick={shoot}></img>
                <Link to="/History" className={classes.link2}>History</Link>
                
               </div>
                <Link to="/home" >
                  <img alt="" src="/search.png" className={classes.search}></img>
               </Link>
                <Form.Control type="text" placeholder="Search..." className={classes.input1}/>
               <Link to="/about" className={classes.link1}>Advanced Search</Link>
               
               <h3 className={classes.h33}>Welcome Back, Doc!</h3>
               <img alt="" src="bell.png" className={classes.img1}></img>
               
                  <Button variant="primary" type="submit" className={classes.button1} onClick={logUserOut}>Logout</Button> 
                
               </Grid> 
            
        );
    }


