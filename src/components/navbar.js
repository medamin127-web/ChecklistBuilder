import React from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Select from "react-select"
import Dropdown from 'react-bootstrap/Dropdown'

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

    input1:{
        width: '200px',
       
        borderRadius: '8px',
        marginRight: '10px',
  },

  search:{
    width:'30px',
    height:'30px',
    maxWidth: '3.7em'
    
},
    link:{
            color:'#B3FFFB',
            
            '&:hover' :{
                color:'#B3FFFB',                
                     
              },
    },

}));
export default function DoctorHome() {
    const classes = useStyles();
    
    return (
        <div>
              <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#0F8BB8',height:'68px'}} variant="dark">
                <Nav className="mr-auto">
                <Nav.Item style={{marginLeft: '-1em'}} >
                    <Nav.Link href="/home" style={{textDecoation:'none'}}><img alt="" src="Logo.png" style={{width:'50px'}}></img></Nav.Link>
                </Nav.Item>
                <Nav.Item style={{marginTop: '1em'}}> 
                    <h3 style={{color:'white',fontFamily:'Inter',marginBottom: 'auto',fontSize: '1.6em'}}>Site Name</h3>
                </Nav.Item>
                <Nav.Item style={{marginLeft:'7em',marginTop:'0.5em'}}>
                    <Nav.Link href="/home" style={{textDecoation:'none',maxWidth: '3.8em'}}>
                        <img alt="" src="/search1.png" style={{width: '2.2em',height: '2.1em'}}className={classes.search}></img>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item  style={{marginTop: '0.8em'}}>
                    <Form.Control type="text" placeholder="Search Checklist..." className={classes.input1} style={{fontFamily:'Josefin Sans'}}/>
                </Nav.Item>
                </Nav>
                <ul style={{listStyle:'none' , listStyleType:'none',margin:'0',padding:'0'}}>
                    <li style={{float:'left',marginRight:'15px'}}><Link><img src='home.png' alt='' style={{width:'50px',display:'box'}}></img></Link></li>
                    <li style={{float:'left',marginRight:'15px'}}>
                        <Dropdown style={{display:'box',marginTop: '0.7em'}} styles={customStyles}>
                            <Dropdown.Toggle   as={Link} className={classes.link} styles={customStyles} style={{textDecoration:'none',fontFamily:'Josefin Sans',fontSize: '1.40em',Color:'#B3FFFB'}} variant="success" id="dropdown-basic">
                                Checklists
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Public</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Private</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">On Going</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li style={{float:'left',marginRight:'15px',textDecoration:'none'}}><Link style={{textDecoration:'none'}}><h4 style={{display:'box',fontFamily:'Josefin Sans',fontSize: '1.40em',color: '#B3FFFB',marginTop:'0.65em',textDecoation:'none'}}>About</h4></Link></li>
                    <li style={{float:'left',marginLeft:'1em'}}><Link to='Signup'><img src="/member.png" alt="" style={{width:'200px'}}></img></Link></li>
                </ul>
                
                
                    </Navbar> 
                    </div>
    )
}
