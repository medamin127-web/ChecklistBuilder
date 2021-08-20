import React , {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar,faFilter } from '@fortawesome/fontawesome-free-solid'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
        
    root:{
        
        height:'100vh',
        backgroundColor:'#C1F0D1',
        
    },
    font1:{
        
    }

}))



export default function Confirmation() {
    const classes = useStyles();


    return (
        
        <div className={classes.root} >
             <Grid  component="main" >
                <Container style={{backgroundColor:'white',marginTop:'3em',padding: '4em 5em',paddingBottom:'0em',maxWidth: 'max-content'}}>

                </Container>
             </Grid>
        </div>
    )
}
