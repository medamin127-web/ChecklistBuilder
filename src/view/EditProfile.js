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


const useStyles = makeStyles((theme) => ({

    root:{
        height: '100vh',
        minHeight : '100vh',
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
        const [name, setname] = useState('');
        const [Email,setEmail]=useState('');
        const [Country,setCountry] = useState('');
        const [Speciality,setSpeciality]=useState('');
        const [image,setimage]=useState('');
        const [OldPassword, setOldPassword] = useState('');
        const [NewPassword, setNewPassword] = useState('');
        const [_id,setid] = useState('');
        const [file,setfile] = useState('');
        const [selectedFile, setSelectedFile] = useState(null);


        
         const fileSelectedHandler = event => {
           setSelectedFile({selectedFile:event.target.files})
           console.log(selectedFile)

        }

        function display(){
            const fd = new FormData();
            
            for (const i of Object.keys(selectedFile)) {
                fd.append('files', selectedFile[i])
              }
              console.log(fd)
        }
        function UpdateImage(){
            const fd = new FormData();
            fd.append('image',selectedFile);
            axios.post('http://localhost:8088/user/ImageUpdate',{
                "_id":_id,
                fd
            }).then(res => {console.log(res)}).catch(function (error) {
        
                console.log(error);                   
                
              });
    }

        let user={};
    function getUserDetails() {
        let token = localStorage.getItem("jwt");
        var decoded = jwt_decode(token);
        user = decoded;
        console.log(user)
        setname(user.name);
        setEmail(user.email);
        setCountry(user.country);
        setSpeciality(user.speciality);
        setimage(user.image);
        setid(user._id);
      };

      useEffect(() => {
        getUserDetails();
            
       
    });
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
  
    
 
        return (
            <div>
                <Grid  component="main" className={classes.root}>
                <div container style={{marginLeft: '30%' ,maxWidth: 'fit-content',background: 'aliceblue',marginTop:'3em',paddingBottom:'1em',borderRadius:'11px'}}>
                    <Row className="justify-content-md-center"  >
                            <Col md='auto' style={{padding: '3em 10em'}}>  
                                <h2 style={{fontFamily:'Krona One'}}>Dr. {name}</h2>
                                <h4 style={{textAlign:'center',color: 'grey'}}>{Speciality}</h4>
                            </Col> 
                        </Row> 
                            <Row>
                                <Col  ><h5 style={{float: 'right' , fontFamily:'Krona One'}}><span style={{color:'grey'}}>0</span> Checklists</h5></Col> 
                                <Col ><h5 style={{fontFamily:'Krona One'}}> <span style={{color:'grey'}}> 0 </span>Total Vues</h5></Col>
                            </Row>
                                
                              
                    </div>
                    <Row className="justify-content-md-center" style={{paddingTop: '2em'}}>
                        <Col md="7" style={{marginTop:'3em',background: 'aliceblue',padding: '5.2em',}}>
                         <Row>
                         <Col md={6}> <img alt="" src="doctor3.jpg" style={{borderRadius: '50%'}} /> 
                          <Row><Col >
                          <Form.Control type="file" style={{marginTop:"0.7em"}} onChange={fileSelectedHandler} multiple />
                          <Button className={classes.button1} style={{fontSize:'1.1em',borderRadius: '50px',marginLeft: '2em'}} onClick={UpdateImage} >Change Image</Button>
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
