import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faCheck,faUserMd} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@material-ui/core';
import { CustomInput } from 'reactstrap';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { ContactSupportOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

    root:{
        
        height:'100vh',
        backgroundColor:'#C1F0D1',
        
    },
    font1:{
        
    },
    button1:{
        backgroundColor:'#0fa5fc',
        color:'white',
        fontFamily: 'Righteous',
        fontSize: 'larger',
        fontWeight: 'bold',
        padding: '5% 4%',
        fontSize: '1.1em',
        lineHeight: '1.35',
        marginTop:'5%',
        fontWeight: '100',
        height: '50px',
        '&:hover' :{
            color:'white',
            
            backgroundColor:'#57bcf6'         
          },
          
    },
    button2:{
        backgroundColor:'#63D467',
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
    
    input1:{
        background: 'rgb(235, 235, 235)',
        transition: '0.3s all',
        '&:focus' :{
            
            outline: 'none'
          },
    },
    img1:{
        cursor: 'pointer',
        '&:hover' :{
            background: "url('plus1.png')"       
          },
        
    }

}))



export default function Results() {
    const _ = require("lodash"); 

    const classes = useStyles();
    const history = useHistory();
 
    const [result,setResult] = useState([])
    const [doctor,setDoctor] = useState([])

    function ShowResult(){
        
        let Resultid = localStorage.getItem("Resultid")
        
        axios.post("http://localhost:8088/ShowResult" , {"Checklistid":localStorage.getItem("id"),"Resultid":Number(Resultid)}).then(function(reponse){
          let res = reponse.data.records[0]._fields[0].properties
          setResult(res)
            console.log(res)

            axios.post('http://localhost:8088/user/Findname',{"name":localStorage.getItem("DoctorName")}).then(function (response) {
                let connt = response.data[0]
                setDoctor(connt)
                })
        })


       }


       useEffect(() => {
           ShowResult();
           
          
       },[]);
       
    return (
        <div style={{background: 'aliceblue'}}>
            
              <Container style={{padding: '4em',maxWidth: '90em'}}>
                <div style={{background:'rgb(15, 139, 184)',padding: '3em',display: 'flex',borderRadius: '15px',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 30%)'}}>
                    <img src={result.image} alt="" style={{width:'20em',height:'15em',borderRadius: '1em'}}/>
                    <div style={{marginLeft: '3em'}}>
                    <h2 style={{fontFamily: 'Poppins',marginBottom: '0.9em',color:'white'}}>{result.title}</h2>
                    <h5 style={{fontFamily: 'Kalam',color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
                </div>
                </div>
                <div style={{padding: '3em',borderRadius: '15px'}}>
                <div style={{display: 'flex'}}>
                <FontAwesomeIcon icon={faUserMd} style={{fontSize: "4em",color: 'rgb(15, 139, 184)'}} />
                <Col md={12} style={{marginTop: 'auto'}}><h2 >Contact Doctor</h2></Col>
                </div>
                <div style={{display: 'flex',paddingLeft: '3em'}}>
                <img src="https://clinicalnotebook.com/wp-content/uploads/2015/04/Doctor-Profile-Pic-Example.png" style={{width: '9em',height:'10em',marginTop: '2em',borderRadius: '50%'}} alt=""></img>
                <div style={{marginTop: '2.5em',marginLeft: '2em'}}>
                    <h3>{doctor.name}</h3>
                    <h6 style={{fontFamily: 'Kalam',color: 'grey',fontSize: '1.2em'}}>Sousse</h6>
                    <button type='button' style={{fontFamily: 'Poppins',border: 'none',padding: '0.6em 2.1em',background:'rgb(15, 139, 184)',color: 'white',borderRadius: '2em',fontSize:'1.3em',marginTop: '0.5em'}}>Contact</button>
                </div>
                </div>
              </div>
              </Container>

              
        </div>
    )
}
