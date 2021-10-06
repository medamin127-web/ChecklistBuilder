import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Select from "react-select"
import { useHistory } from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'


function shoot() {
  alert("Great Shot!");
}

const customStyles = {
  indicatorsContainer: () => ({
    '.myDropDown': {
      '&__dropdown-indicator': {
        color: 'red' // <--- Color of your choice
      }
    }
  })
};

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
    input2:{
      background: 'white',

      '&:focus' :{
          borderColor: '#ced4da',
          boxShadow: 'none',
          outline: 'none'
        },
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
          
          <div> 
              <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#91D5AD',height:'68px'}} variant="dark">
              <Nav className="mr-auto">
                <Nav.Item style={{marginTop: '1em'}}> 
                <Link to="/DoctorHome" style={{textDecoration: 'none'}}><h3 style={{color:'white',fontFamily:'Poppins',marginBottom: '0.4em'}}>Symptom Checker</h3></Link>
                </Nav.Item>
                </Nav>

                <Nav className="mr-auto">
                
                    <Nav.Item style={{marginRight:'1.2em'}}><Link  to="/DoctorHome"  style={{textDecoration:'none'}}><h3 style={{fontWeight: '800',color:'#080808',fontFamily:'Poppins',marginTop: '0.6em',fontSize: '1.5em'}}>Home</h3></Link> </Nav.Item>
                    <Nav.Item style={{marginRight:'1.2em'}}><Link  to="/Step1" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',marginTop: '0.6em',fontSize: '1.5em'}}>Build Checklist</h3></Link></Nav.Item>
                    <Nav.Item style={{marginRight:'1.2em'}}>
                        <Dropdown style={{display:'box',marginTop: '0.7em'}} styles={customStyles}>
                            <Dropdown.Toggle   classNamePrefix='myDropDown'  as={Link} className={classes.link} styles={customStyles}  style={{textDecoration:'none',color:'white',fontFamily:'Poppins',fontSize:'1.5em',Color:'#B3FFFB',marginTop: '0.6em'}} variant="success" id="dropdown-basic">
                                Checklists
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Public</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Private</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">On Going</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Nav.Item>
                        <Nav.Item style={{marginRight:'1.2em'}}><Link to="/History" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',marginTop: '0.6em',fontSize: '1.5em'}}>History</h3></Link></Nav.Item>
                        <Nav.Item style={{marginRight:'1.2em'}}><Link to="/Edit" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Poppins',marginTop: '0.6em',fontSize: '1.5em'}}>Edit Profile</h3></Link></Nav.Item>
                
                </Nav>
               <div style={{display: 'flex',flexDirection: 'row',marginBottom: '0.5em'}}>
                  <Link to="/home" >
                    <img alt="" src="/search.png" className={classes.search}></img>
                </Link>    
                  <Form.Control type="text" placeholder="Search..." className={classes.input2} style={{  width: '200px', marginTop: '16px',marginRight: '10px',fontFamily: 'Inter',fontSize: '1em',height:"2.4em",borderRadius: "3em",border: "none",paddingLeft:"2em"}}/>
                <Link to="/about" className={classes.link1}>Advanced Search</Link>
              </div>
              <div style={{display: 'flex',marginBottom: '0.5em'}}>
                <h3 className={classes.h33} style={{fontFamily: 'Poppins'}}>Welcome Back, Doc!</h3>
                <img alt="" src="bell.png" className={classes.img1}></img>
                <Button variant="primary" type="submit" className={classes.button1} onClick={logUserOut}>Logout</Button> 
              </div>  
                  </Navbar> 

                  </div>
            
        );
    }


