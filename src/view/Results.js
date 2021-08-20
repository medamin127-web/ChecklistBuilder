import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faCheck} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@material-ui/core';
import { CustomInput } from 'reactstrap';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

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
    const[Answers2,setAnswers2] = useState([])
    const [Answers,setAnswers] = useState([])
    const [results,setResults] = useState([])

    function addtwo(){
    
        let apiURL = "http://localhost:8088/ShowRelation"
       axios.get(apiURL)
       .then(function (response) {    
            
           console.log(response)
            let cont = response.data.result.records
            let Results = []
            
        
            for (var i=0; i<=cont.length-1;i++){

                let object1 = {
                            "nameA":cont[i]._fields[0],
                            "OGQt":cont[i]._fields[0],
                            "rel_answer":cont[i]._fields[1],
                            "QuestionB":cont[i]._fields[2],
                            "nameB":cont[i]._fields[3]
                }
                Results.push(object1)

               
            }

            var grouped = _.mapValues(_.groupBy(Results, 'nameA'),
            clist => clist.map(result=> _.omit(result, 'nameA')));


            
            let Array4 = []
         for ( var result in grouped ){
             Array4.push(grouped[result])
             
             
         }
         console.log(Array4)
         setResults(Array4)
               

            /*for (var result in results) {
                console.log(result);
              }*/
           }
           ).catch(function (error) {
        
            console.log(error);                   
            
          });

       }
    
       useEffect(() => {
           addtwo();
           
          
       },[]);
       
    return (
        <div>
              <Row className="justify-content-md-center" >
              <Container>
              
                
              <Col md={12} style={{textAlign: 'center'}}><h2>Q1</h2></Col>
                    {results.map((result, i) => {
                        return (
                        <Row className="justify-content-md-center" >
                            {result.map((result2, ii) => {

                               return <div>
                                   <Col md={12} style={{textAlign: 'center'}}><h2>{result2.rel_answer}</h2></Col>
                                    <Col md={12} style={{textAlign: 'center'}}><h2>{result2.nameB}</h2></Col>
                                    <Col md={12} style={{textAlign: 'center'}}><h2>{result2.QuestionB}</h2></Col></div>
                            })}  
                        </Row>)
                        
                    })}  
                </Container>
              </Row>
        </div>
    )
}
