import React from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Select from "react-select"
import Dropdown from 'react-bootstrap/Dropdown'
import { faPlus , faTrash,faCheck,faHome} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
              <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'rgb(15, 139, 184)',height:'60px'}} variant="dark">
                <Nav className="mr-auto">
                <Nav.Item style={{marginTop: '1em'}}> 
                    <Link to="/home" style={{textDecoration: 'none'}}><h3 style={{color:'white',fontFamily:'Poppins',marginBottom: '0.4em'}}>Symptom Checker</h3></Link>
                </Nav.Item>
                <Nav.Item style={{marginTop:'0.5em',marginLeft: '1em'}}>
                    <Nav.Link href="/home" style={{textDecoation:'none',maxWidth: '3.8em'}}>
                        <img alt="" src="/search1.png" style={{width: '2.2em',height: '2.1em'}}className={classes.search}></img>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item  style={{marginTop: '0.8em'}}>
                    <Form.Control type="text" placeholder="Search Checklist..." className={classes.input1} style={{fontFamily:'Poppins'}}/>
                </Nav.Item>
                </Nav>
                <ul style={{listStyle:'none' , listStyleType:'none',margin:'0',padding:'0',display: 'flex',flexDirection: 'row'}}>
                    <div>
                        <li style={{float:'left',marginRight:'1.5em'}}><Link to="/Home"><FontAwesomeIcon icon={faHome} style={{marginRight: '0.1em',fontSize: '2.6em',color: '#ffffff',background: 'rgb(40, 189, 247)',padding: '0.15em',borderRadius: '10%',marginTop: '0.15em'}}/></Link></li>
                        <li style={{float:'left',marginRight:'1.5em'}}>
                        <Link to="/Checklists" style={{textDecoration:'none'}} ><h3 style={{color:'white',fontFamily:'Cairo',marginTop: '0.6em',fontSize: '1.5em'}}> Checklists</h3></Link>
                        </li>
                        <li style={{float:'left',marginRight:'1.5em'}}>
                        <Link to="/About" style={{textDecoration:'none'}}><h3 style={{color:'white',fontFamily:'Cairo',marginTop: '0.6em',fontSize: '1.5em'}}>About</h3></Link>
                        </li>
                        <li style={{float:'left',marginRight:'1.5em',marginTop: '0.5em'}}>
                        <button style={{padding: '0.4em 1.4em',border:'none',background: '#28bdf7',borderRadius: '2em',fontFamily: 'Poppins',color: 'white',fontSize: '1.1em',textShadow: '2px 2px 2px black'}}>Contact</button>
                        </li>
                    </div>
                    <li style={{float:'left',marginLeft:'1em'}}><Link to='Signup'><img src="/login.png" alt="" style={{width: '10em'}} ></img></Link></li>
                </ul>
                
                
                    </Navbar> 
                    </div>
    )
}
