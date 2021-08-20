import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function UserFooter() {
    return (
        <div>
            <footer style={{backgroundColor: "#0F8BB8",height: '60px'}}>
                <Row>
                    <Col md={4}><h4 style={{fontFamily: 'Cairo',marginTop: '0.7em',fontWeight: '500',color: 'beige'}}>Copyright © By Mohamed Amin Hawala 2021</h4></Col>
                     <Col md={{ span: 4, offset: 4 }}> 
                    <Row>
                        <Col md={1}><img style={{width:'3em',marginTop: '0.5em'}} src="telephone.png" alt="" /> </Col>
                        <Col md={2}><h4 style={{fontFamily:'Cairo',marginTop:'0.7em',color:'white'}}>28363508</h4></Col>
                        <Col md={1}><img style={{width:'3em',marginTop: '0.8em',marginLeft:'0.9em'}} src="gmail.png" alt="" /> </Col>
                        <Col md={2}><h4 style={{fontFamily:'Cairo',marginTop:'0.7em',color:'white',marginLeft:'0.5em'}}>medaminhawala96@gmail.com</h4></Col>
                    </Row>
                     </Col>

                </Row>
            </footer>
        </div>
    )
}
