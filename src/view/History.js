import React,{useState,useEffect} from 'react'
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
import {Helmet} from "react-helmet";
import axios from "axios";
import jwt_decode from "jwt-decode";


const useStyles = makeStyles((theme) => ({

        root:{
            
            height:'100vh',
            backgroundColor:'#C1F0D1',
            
        },
        font1:{
            
        }

}))

export default function History() {
    const classes = useStyles();


    const [history,setHistory] = useState([])
    const [name,setname] = useState()
    
    let user={};
    function getUserDetails() {
        let token = localStorage.getItem("jwt");
        var decoded = jwt_decode(token);
        user = decoded;
       
        setname(user.name);
        
      };
    function showHistory(){

        let user={};  
        let token = localStorage.getItem("jwt");
        var decoded = jwt_decode(token);
        user = decoded;
       let nom = user.name
        setname(user.name);
        
    axios.post('http://localhost:8088/showhistory',{"doctname":nom}).then(function(response){

        let connt = response.data.result.records
       
         let arr = []
            for (var i=0;i<=connt.length-1;i++)
            {
                arr.push(connt[i]._fields[0].properties)
            }
            
            
            setHistory(arr)
            

    })
        }   
   

      useEffect(() => {
          
        showHistory()
            
       
    });
    return (
        <div className={classes.root}>
            <Helmet>
                <style>{'body { background-color: #C1F0D1; }'}</style>
            </Helmet>
            <Grid  component="main" >
            
                <Row fluid style={{background: 'aliceblue',marginTop:'2em',padding: '1em'}}>
                <Col sm="12" md={{ size: 6, offset: 5 }}>                  
                    <h2 style={{marginTop: '0.3em',fontSize: '3em',fontFamily: 'Poppins'}}>Checklists History</h2> 
                
                </Col>
                <Col ><div style={{float: 'right',marginRight: '4em',marginTop: '0.5em'}}><Link style={{fontSize: '2.5em',padding: '0.5em',color: 'rgb(117 143 124)',textDecoration:'none'}}><FontAwesomeIcon icon={faChartBar} className={classes.font1}/><span style={{marginLeft: '5px'}}>Stats</span></Link>
                    <Link style={{fontSize: '2.5em',padding: '0.5em',color: 'rgb(117 143 124)',textDecoration:'none'}}><FontAwesomeIcon icon={faFilter} className={classes.font1}/><span style={{marginLeft: '5px'}}>Filter</span></Link></div></Col>
                </Row>
            
            <Container style={{marginTop:'2em'}}>
            <Row  className="justify-content-md-center" style={{backgroundColor:'#A1CEAD',padding:'1em'}}>
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>#</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',color: 'white'}}>Name</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>Age</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>Gender</h4></Col>  
                <Col md={2}><h4 style={{textAlign:'center',color: 'white'}}>Checklist</h4></Col>            
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>Date</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',color: 'white'}}>Results</h4></Col>
                </Row>
             </Container> 
              <Container style={{backgroundColor:'white'}}>
              {history.map((histo,i) =>{return ( 
                 <Row style={{padding:'1.5em'}} key={i}>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{i}</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.Username}</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.Age}</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.gender}</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.ChecklistName}</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.Date}</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Poppins',fontSize: '1.3em'}}>{histo.ResultTitle}</h4></Col>
                </Row>
              )})}
              </Container> 
              <Container>
                  <Row style={{marginTop: '5em'}}> 
                <Col md={6}><Button style={{float: 'right',background: 'rgb(82 151 100)',color: 'aliceblue',fontFamily: 'Inter',padding: '0.5em 1.5em',fontSize: '1em'}}>Prev</Button></Col>
                <Col md={6}><Button style={{background: 'rgb(82 151 100)',color: 'aliceblue',fontFamily: 'Inter',padding: '0.5em 1.5em',fontSize: '1em'}}>Next</Button></Col>
                </Row>
              </Container>
            </Grid>

        </div>
    )
}
