import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Navbar,Nav} from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Select from "react-select"
import Dropdown from 'react-bootstrap/Dropdown'

export default function UserFooter() {
    return (
        <div>
            <footer style={{backgroundColor: "#0F8BB8",left:'0',bottom:'0',right:'0'}}>
             
                
                <Row style={{paddingTop: '1.5em'}}>
                <ul style={{listStyle:'none' , listStyleType:'none',padding:'0',display: 'flex',flexDirection: 'row',margin:'auto',marginTop:'2.5m',marginBottom: '0.4em'}}>
                    
                        <li style={{float:'left',marginRight:'1.5em'}}><Link to="/Home" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',fontSize: '1.5em'}}>Home</h3></Link></li>
                        <li style={{float:'left',marginRight:'1.5em'}}>
                        <Link to="/Checklists" style={{textDecoration:'none'}} ><h3 style={{color:'white',fontFamily:'Poppins',fontSize: '1.5em'}}> Checklists</h3></Link>
                        </li>
                        <li style={{float:'left',marginRight:'1.5em'}}>
                        <Link to="/About" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',fontSize: '1.5em'}}>About</h3></Link>
                        </li>
                        <li style={{float:'left',marginRight:'1.5em'}}>
                        <Link to="/Contact" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',fontSize: '1.5em'}}>Contact</h3></Link>
                        </li>
                        
                       
                </ul>
               
               
                </Row>
                <hr style={{borderTop: '2px solid #8d8d8d',maxWidth: '100em',margin: 'auto'}}></hr>
                <Row className='mr-0'>
                <Col md={12} style={{display: 'flex'}}>
                        <Col md={5} style={{display: 'flex'}}>
                        <h4 style={{marginTop: '0.7em',fontWeight: '500',color: 'beige',display: 'flex',margin: 'inherit',position: 'absolute',top: '1em'}}>Copyright © By Mohamed Amin Hawala 2021</h4>
                        </Col>
                     <Col md={7} style={{display: 'flex',maxWidth: 'max-content', margin: 'auto'}}> 
                        <Col md={6} style={{display: 'flex'}}>
                            <img style={{width:'3em',marginTop: '0.5em',marginRight: '0.3em'}} src="/call.png" alt="" /> 
                            <h4 style={{fontFamily:'Poppins',marginTop:'0.9em',color:'white',fontSize:'1.4em'}}>+216 28363508</h4>
                       </Col>
                       <Col md={6} style={{display: 'flex'}}>
                            <img style={{width:'3em',marginTop: '0.8em',marginLeft:'0.9em',height:'2.4em'}} src="/gmail.png" alt="" />
                            <h4 style={{fontFamily:'Poppins',marginTop:'0.9em',color:'white',marginLeft: '0.2em',fontSize:'1.4em'}}>medaminhawala96@gmail.com</h4>
                       </Col>
                   
                     </Col>
                     </Col>
                </Row>
            </footer>
        </div>
    )
}
