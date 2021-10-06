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
import axios from "axios";
import Modal from 'react-modal';






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

       
    



    function sendinfo(){
    axios.post('http://localhost:8088/createChecklist',{
            "title": title,
            "type": type,
            "description": description,
            "image": image,
            
    })
    .then(function (response) {    
      
        localStorage.setItem("Title", title); 
        history.push("/Questions");
      })
      .catch(function (error) {
        
        console.log(error);                   
        
      });
      
        
        
        }

        
    return (
        <div className={classes.root}>
             <Grid  component="main" >
                <Container style={{backgroundColor:'white',marginTop:'3em',padding: '4em 5em',paddingBottom:'0em',maxWidth: 'max-content'}}>
                    <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>Step 1 : Add Basic Info About the checklist</h2>
                    
                    <Form className={classes.form}>
                    <Row className="justify-content-md-center" style={{marginTop:'2.1em'}}>
                        <Col md={6}>
                            <Form.Control type="text" placeholder="Title" value={title}  onChange={(e) =>setTitle(e.target.value)} style={{backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em'}} className={classes.input1} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}>
                        <Col md={6}>
                            <Form.Control as="select"   value={type} onChange={(e) =>setType(e.target.value)}  style={{width:'8em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em'}}>
                            <option >Type</option>
                            <option>General</option>
                            <option>General</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" >
                    <Col md={6}>
                    <Form.Control as="textarea" placeholder="Description" rows={3} value={description}  onChange={(e) =>setDescription(e.target.value)} style={{marginTop:'1.5em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1em'}} />
                    </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{marginTop:'1.5em',}}>
                    </Row>
                    <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}>
                    <Col md={6}>
                    <Form.Control type="text" placeholder="Image" value={image}  onChange={(e) =>setImage(e.target.value)} className={classes.input1} style={{backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em'}} />
                    </Col>
                    </Row>
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
                        <img alt="" src="/docotr6.png" style={{width:'170px',maxHeight: '200px'}}></img>
                        </Col>
                    </Row>  
                    </Form>
                </Container>
                <div>
  
                 </div>

            </Grid>
        </div>
    )
}
