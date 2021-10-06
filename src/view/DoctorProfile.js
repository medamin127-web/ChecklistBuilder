import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faCheck, faSearch,faFilter,faEdit,faUnlock,faBackward,faForward,faEye,faCapsules,faCalendarAlt} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@material-ui/core';
import { CustomInput } from 'reactstrap';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const useStyles = makeStyles((theme) => ({

    root:{
        
        height:'100vh',
        
        
    },
    font1:{
        
    },
    btn:{
        opacity: '50%'
    },
    button1:{
        backgroundColor:'#39c320',
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
       
        
        height: '55px',
        borderRadius: '5%',
        
        
       
        lineHeight: '1.35',
        
        
        '&:hover' :{
            color:'white',
            
            backgroundColor:'#3eba7b'         
          },
    },
    input:{
        
        backgroundColor:"red"
        
        
    },
    input1:{
        background: 'white',

        '&:focus' :{
            borderColor: '#ced4da',
            boxShadow: 'none',
            outline: 'none'
          },
    },
    ahref:{
        color:"black",
        '&:hover' :{
            textDecoration: "none",
            color:"white"
            }
    },
    img1:{
        cursor: 'pointer',
        '&:hover' :{
            background: "url('plus1.png')"       
          },
        
    },
    trash:{
        color:"rgb(52, 199, 103)",
        '&:hover' :{
            color:"white"
        },
    },
    search:{
        width:'22px',
        height:'22px',
       
    },

}))


export default function DoctorProfile() {
    const _ = require("lodash"); 


    const history = useHistory(); 
    const classes = useStyles();

    const [checklists,setChecklists] = useState([])
    const [doctor,setDoctor] = useState({})
    const [Tags,setTags] = useState([])

    let Doctorname = localStorage.getItem('Docname')

    function showall(){

        axios.post('http://localhost:8088/showDoctorChecklists',{'name':Doctorname}).then(function(response){
            let rel = response.data.result.records
           
            let check = []

            for ( var l=0;l<=rel.length-1;l++)
            {
                check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})

            }
          
            

            
           
            axios.post('http://localhost:8088/user/Findname',{"name":Doctorname}).then(function (res) {

                  let cont = res.data[0]

                  setDoctor(cont)


                  axios.post('http://localhost:8088/findtags2',{'checklists':check}).then(function(result) {

                        let resultat = result.data.result.records

                        
                        let table=[]
                        for (var i=0;i<=resultat.length-1;i++) 
                        {

                            let object2 = {
                                "tagname":resultat[i]._fields[0],
                                "checkid":resultat[i]._fields[1],
                    }
                            table.push(object2)
                        }

                        var grouped2 = _.mapValues(_.groupBy(table, 'checkid'),
                        clist => clist.map(tab=> _.omit(tab, 'checkid')));

                        let Tags1 = []
                        for ( var tags in grouped2 ){
                            Tags1.push(grouped2[tags])
                            
                            
                        }

                        setTags(Tags1)
                        let check1 = check
                        for (var j=0;j<=check.length-1;j++) 
                        {
                            check1[j].fields.tags = Tags1[j]
                        }
                        setChecklists(check1)
                        console.log(check1)
                        
                  })
                 
            })

    })

    }

    function redirecttag(tag)
    {
        
        history.push({
            pathname: "/Checklists/",
            search: tag,
            state: { tagname: tag }
        });
    }
    
    
    useEffect(() => {
        showall();
        
       
    },[]);

    return (
        <div>
              <Grid  component="main" >

                <Container style={{marginTop:'3em'}}>

                    <Row style={{marginBottom: '3em'}}>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <img alt="" src="https://clinicalnotebook.com/wp-content/uploads/2015/04/Doctor-Profile-Pic-Example.png" style={{width: '200px',height: '90%',borderRadius: '50%',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)'}}/>
                    </Col>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <h2>{doctor.name}</h2>
                    </Col>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <h6>{doctor.Email}</h6>
                    </Col>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <h6>{doctor.Speciality}</h6>
                    </Col>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <h6>{doctor.Country}</h6>
                    </Col>
                    <Col md={12} style={{textAlign: 'center'}}>
                    <button type='button' style={{fontFamily: 'Poppins',border: 'none',padding: '0.5em 2.1em',background:'#278fea',color: 'white',borderRadius: '2em'}}>Contact</button>
                    </Col>
                    </Row>



                    <div style={{padding: '2em',textAlign: 'center',background: 'aliceblue'}}>
                        <Row>{checklists.map((checklist,i) =>{return ( 
                            <Col  Key={i} style={{maxWidth: 'max-content',margin: 'auto',marginBottom:'2.5em'}}>
                            <img alt="" src={checklist.fields.image} style={{width: '21em',height: '14em',borderRadius: '2em',cursor:'pointer'}}></img>
                             <Row style={{marginTop: '0.5em'}}>
                             <Col><h3 style={{textAlign:'start',marginLeft: '0.9em',fontFamily: 'Poppins',fontSize: '1.6em'}}>{checklist.fields.title}</h3></Col>
                             <Col md={4} style={{display: 'flex',marginTop: '0.5em'}}><FontAwesomeIcon icon={faEye} style={{marginRight: '5px',fontSize: '1.4em'}}/><h5 style={{fontFamily: 'Poppins'}}>{checklist.fields.views}</h5></Col>
                             </Row>
                             {checklist.fields.tags.map((tag,i) =>{return(  
                                 
                             <button type='button' style={{border: 'none',padding: '0.3em 1em',background: 'rgb(142 228 242)',borderRadius: '50px',color: '#716969',marginRight:'0.4em'}} onClick={e =>redirecttag(tag.tagname)}>{tag.tagname}</button> 
                                )})}
                            </Col>
                            )})}
                        </Row>
                    </div>
                </Container>

                <div style={{paddingTop:'3em',background:'rgb(234 234 234)'}}>

                    
                </div>

              </Grid>
        </div>
    )
}
