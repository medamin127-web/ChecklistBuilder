import React , {useEffect, useState} from 'react'
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
import jwt_decode from "jwt-decode";
import axios from "axios";
import TagsInput from './TagsInput';
import '../styles.scss';
import {Helmet} from "react-helmet";


const useStyles = makeStyles((theme) => ({

    root:{
        
        height:'100vh',
        backgroundColor:'#C1F0D1',
        
    },
    font1:{
        
    }

}))


export default function Step1() {


    const classes = useStyles();
    const history = useHistory(); 

    const [title,setTitle] = useState();
    const [type,setType] = useState();
    const [description,setDescription] = useState();
    const [image,setImage]=useState();
    const [info,setInfo] = useState();
    const [name,setname] = useState();
    const [Tags,setTags2] = useState([])
    const [tags2,setTags3] = useState([])
   
    const selectedTags = tags => setTags2(tags);
       
    
     
    function sendinfo(){
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;


    axios.post('http://localhost:8088/createChecklist2',{
            "title": title,
            "type": type,
            "description": description,
            "image": image,
            "DateCreated": today,
            "doctorname" : name,
            "views":0,
            
    })
    .then(function (response) {    
       let id = response.data.result.records[0]._fields[0].id.low
        
        localStorage.setItem("id", id); 

        axios.post('http://localhost:8088/CreateTags',{'tag':Tags}).then(function (response) {  

            axios.post('http://localhost:8088/AddRelation3',{'tags':Tags,'Checklistid':id}).then(function (response) {


            })
    })
        history.push("/Questions");
      })
      .catch(function (error) {
        
        console.log(error);                   
        
      });
      
        
        
        }
        let user={};
        function getUserDetails() {
            let token = localStorage.getItem("jwt");
            var decoded = jwt_decode(token);
            user = decoded;
           
            setname(user.name);
            
          };


       

        useEffect(() => {
            getUserDetails();
                
           
        });

        
    return (
        <div className={classes.root}>
             <Helmet>
                <style>{'body { background-color: #C1F0D1; }'}</style>
            </Helmet>
             <Grid  component="main" >
                <Container style={{backgroundColor:'white',marginTop:'3em',padding: '4em 5em',paddingBottom:'0em',maxWidth: 'max-content'}}>
                    <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>Step 1 : Add Basic Info About the checklist</h2>
                    
                    <Form className={classes.form}>
                    <Row className="justify-content-md-center" style={{marginTop:'2.1em'}}>
                        <Col md={6}>
                            <Form.Control type="text" placeholder="Title" value={title}  onChange={(e) =>setTitle(e.target.value)} style={{border: 'none',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em'}} className={classes.input1} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}>
                        <Col md={6}>
                            <Form.Control as="select"   value={type} onChange={(e) =>setType(e.target.value)}  style={{border: 'none',width:'8em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em'}}>
                            <option selected="true" disabled="disabled" >Type</option>
                            <option>General</option>
                            <option>General</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" >
                    <Col md={6}>
                    <Form.Control as="textarea" placeholder="Description" rows={3} value={description}  onChange={(e) =>setDescription(e.target.value)} style={{border: 'none',marginTop:'1.5em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1em'}} />
                    </Col>
                    </Row>

                    <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}>
                    <Col md={6}>
                    <Form.Control type="text" placeholder="Image" value={image}  onChange={(e) =>setImage(e.target.value)} className={classes.input1} style={{border: 'none',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em'}} />
                    </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}><Col md={12}><TagsInput selectedTags={selectedTags} /></Col></Row>
                    <Row>
                        <Col md={12} style={{marginLeft: '34%' , marginTop:'2em'}}>
                        <Link style={{textDecoration:'none'}}>
                            <img alt="" src="yes.png" style={{width:'80px'}} onClick={sendinfo}></img>
                        </Link>
                        <Link style={{textDecoration:'none'}} to="/DoctorHome">
                            <img alt="" src="no.png" style={{width:'67px'}}></img>
                        </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} style={{marginLeft:'82%'}}>
                        <img alt="" src="/docotr6.png" style={{maxHeight: '200px'}}></img>
                        </Col>
                    </Row>  
                    
                    </Form>
                </Container>

            </Grid>
        </div>
    )
}
