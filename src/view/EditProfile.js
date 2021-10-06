import React,{useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {Helmet} from "react-helmet";

const useStyles = makeStyles((theme) => ({

    root:{
       
        backgroundColor:'#C1F0D1'
    },

    input1:{
        backgroundColor:"rgb(235, 235, 235)",
        height: '4em',
        marginTop: '2em',
        width: '20em',
        borderRadius: '10px',
        fontFamily: 'Red Hat Display'
    },
    button1:{
        backgroundColor:'#2EB837',
        color:'white',
        fontFamily: 'Righteous',
        fontSize: 'larger',
        fontWeight: 'bold',
        padding: '5% 10%',
        fontSize: '1.6em',
        lineHeight: '1.35',
        marginTop:'5%',
        fontWeight: '100',
        height: '50px',
        '&:hover' :{
            color:'white',
            
            backgroundColor:'#3eba7b'         
          },
          
    },
    link1:{
        color:'#91D5AD',
         '&:hover' :{
           color:'#2e9b50'
          },   
        
    }

}));


export default function EditProfile()  {
        const classes = useStyles();
        const history = useHistory(); 
        const [name, setname] = useState();
        const [Email,setEmail]=useState();
        const [Country,setCountry] = useState();
        const [Speciality,setSpeciality]=useState('');
        const [image,setimage]=useState();
        const [OldPassword, setOldPassword] = useState();
        const [NewPassword, setNewPassword] = useState();
        const [id,setid] = useState();
        const [files,setfiles] = useState();
        const [imagesArray,setImagesArray] = useState();
        const [length,setLength] = useState(0)
        const [views,setViews] = useState(0)
        
         
     function uploadFiles (event) {
         let file = event.target.files[0]
        setfiles(event.target.files[0])

        const formData = new FormData();

        formData.append('image', file);

        axios.post('http://localhost:8088/user/UploadImage',formData).then(function (response) {    
            console.log(response);
            
        })
        }


      function onUpload(){
          
        
        axios.post('http://localhost:8088/user/ImageUpdate',{"id": id,"files":files.name}).then(function (response) {    
            console.log(response);
            
        })
        
    }

     
    function formPreventDefault(e) {
 
        e.preventDefault();
      }

    function ResetPassword(){
        axios.post('http://localhost:8088/user/Password', {
            "email": Email,
            "password": OldPassword,
            "newpassword":NewPassword
    })
    .then(function (response) {    
        if (!response.data.msg)
        {   
            
            swal("Password Changed!", "", "success");                
            setOldPassword("")
            setNewPassword("")
        }
        
        else{
            swal("Invalid Info!", "", "error");
        }
        

      })
      .catch(function (error) {
        
        console.log(error);                   
        
      });
    }
    
    function ShowAll()
    {
        let user={};
        let token = localStorage.getItem("jwt");
            var decoded = jwt_decode(token);
            user = decoded;
            setname(user.name);
            setEmail(user.email);
            setCountry(user.country);
            setSpeciality(user.speciality);
            setid(user._id)
            let id = user._id

            axios.post('http://localhost:8088/user/FindDoctorById',{'id':id}).then(function (response) {
            
            setimage(response.data.image)
            console.log(response.data.image)
            })
            axios.post('http://localhost:8088/ShowChecklists',{'Doctorname':user.name}).then(function (response) {
                
                let res = response.data.result.records.length
                 let connt = response.data.result.records
                setLength(res)
                let totalViews = 0

                for (var i=0;i<=connt.length-1;i++)
                {
                    totalViews+=Number(connt[i]._fields[0].properties.views)
                    

                    
                }
                setViews(totalViews)
                })
    }   
    
    useEffect(() => {
        ShowAll()
            
       
    });
        return (
            <div>
                <Grid  component="main" className={classes.root}>
                <Helmet>
                <style>{'body { background-color: #C1F0D1; }'}</style>
                </Helmet>
                <div container style={{maxWidth: 'fit-content',background: 'aliceblue',paddingBottom:'1em',borderRadius:'11px',margin: 'auto',marginTop: '2em'}}>
                    <Row className="justify-content-md-center"  >
                            <Col md='auto' style={{padding: '3em 10em'}}>  
                                <h2 style={{fontFamily:'Poppins'}}>Dr. {name}</h2>
                                <h4 style={{textAlign:'center',color: 'grey',fontFamily:'Cairo'}}>{Speciality}</h4>
                            </Col> 
                        </Row> 
                            <Row>
                                <Col  ><h5 style={{float: 'right' , fontFamily:'Krona One'}}><span style={{color:'grey'}}>{length}</span> Checklists</h5></Col> 
                                <Col ><h5 style={{fontFamily:'Krona One'}}> <span style={{color:'grey'}}>{views} </span>Total Vues</h5></Col>
                            </Row>
                                
                              
                    </div>
                    <Row className="justify-content-md-center" style={{paddingTop: '2em'}}>
                        <Col md="7" style={{marginTop:'3em',background: 'aliceblue',padding: '5.2em',marginBottom: '5em'}}>
                         <Row>
                         <Col md={6}> <img alt="" src='images/101604992_3000354460078781_4003543663203319808_n.jpg' style={{borderRadius: '50%',width: '18em',height: '18em'}} /> 
                          <Row><Col >
                          <Form.Control style={{marginTop:"0.7em"}} onChange={uploadFiles } type="file" accept=".png, .jpg, .jpeg" name="photo"/>
                          <Button className={classes.button1} style={{fontSize:'1.1em',borderRadius: '50px',marginLeft: '2em'}}  encType='multipart/form-data' onClick={onUpload} >Change Image</Button>
                          </Col>
                          </Row>
                         </Col>
                         <Col md={6}>
                          <Form className={classes.form} onSubmit={formPreventDefault}>
                            <h2 style={{}}>Change Password</h2>
                             <Form.Control type="password" placeholder="Old Password" className={classes.input1} value={OldPassword} onChange={(e) =>setOldPassword(e.target.value)} />
                             <Form.Control type="password" placeholder="New Password" className={classes.input1} value={NewPassword} onChange={(e) =>setNewPassword(e.target.value)} />
                             
                             <Button className={classes.button1} style={{width: '7em' ,fontSize:'1.2em'}} onClick={ResetPassword}>Confirm</Button>
                             
                          </Form>
                          </Col>
                         </Row>
                        </Col>
                    </Row>
                    
                </Grid>
            </div>
        )
    
}
