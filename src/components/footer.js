import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const useStyles = makeStyles((theme) => ({
        div1:{
            position: 'absolute',
            left: '60%',
            bottom: '60%',
        }
}));

//<Footer>
export default function Footer() {
    const classes = useStyles();
    return (
         
        <div className="p-3"  style={{backgroundColor: "#8FFFC7",height: '70px'}} >
            
            <Row>
                <Col  md={7} style={{height: 'fit-content'}}>
                <h3 style={{fontFamily: "Inika",maxWidth: 'max-content',fontSize: '1.3em',marginTop: '0.5%'}}>Copyright © By Mohamed Amin Hawala 2021</h3>
                </Col>
                <Col  md={3} >

                <img alt="" src="/gmail.png" style={{width:'9%',position:'relative',left:'25%',top:'8%'}}></img>
                <h5 style={{fontFamily:'Indie Flower',fontWeight: 'bold',position: 'relative',right: '12%',bottom:'26%',left:'37%'}}>medaminhawala96@gmail.com</h5>
                
                </Col>
                <Col  md={2} style={{position:'relative',right: '7%'}}> <img alt="" src="/telephone.png" style={{width:'12%',position:'relative',left: '40%',top: '3%'}}></img>
                <h5 style={{fontFamily:'Indie Flower',position: 'relative',left: '57%',bottom: '38%',fontWeight: 'bold',fontSize:'1.5em'}}>28363508</h5>
                </Col>
            </Row>
            
            
        
        </div>
        
    )
}
