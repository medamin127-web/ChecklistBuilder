import React ,{useState,useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { faChevronDown,faPlus,faChevronUp } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'


const useStyles = makeStyles((theme) => ({

    root: {
    
       
        //backgroundColorheight: '100%',
        height: '25em',
       
      backgroundColor: '#28bdf7',
     
      
     
        //backgroundColor: "#f9d802",
        
      },

    button1:{
        background: '#44CCFF',
        '&:hover' :{         
            backgroundColor:'#3eba7b'         
          },
    }
}))


export default function About() {

    const classes = useStyles();

    return (
       
             <Grid  component="main" >
            <div className={classes.root} >
            
             
              <h3 style={{padding: '4em',textAlign:'center',fontFamily: 'Kalam',color: 'white',fontSize:'3em'}}>About Symptom Checker</h3>
            </div>
             <Container  style={{backgroundColor:'grey',marginTop:'3em',padding: '2em 15em',borderRadius:'2em',background: '#a5e3fb',fontFamily: 'Poppins',color: '#717171'}}>
                    <h3>life sucks man</h3>
            </Container>
            </Grid>
      
    )
}
