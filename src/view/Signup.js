import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from '@fortawesome/fontawesome-free-solid'
import axios from "axios";
import { useHistory } from "react-router-dom";
import DoctorHome from './DoctorHome';
import swal from 'sweetalert';






const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:"white",
   
    //backgroundColorheight: '100%',
  
  
    //backgroundColor: "#f9d802",
    
  },

  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  
  input1:{
      width: '90%',
      height: '60px',
      backgroundColor: '#b7bbbd',
      marginBottom:'15px',
      margin: '0 auto',
      border: 'none', /* <-- This thing here */
      border:'solid 1px #ccc',
      borderRadius: '110px',
      paddingLeft:'60px',
      fontFamily: 'Kalam',
      fontSize:'1.2em'
  },
  button1:{
      width: '90%',
      height: '70px',
      margin: '0 auto',
      marginLeft: '25px',
      backgroundColor:'#FF9233',
      border: 'none', /* <-- This thing here */
      border:'solid 1px #ccc',
      borderRadius: '110px',
      color:'white',
      marginTop: '30px',
      fontSize: '18px',
      fontFamily: 'Kalam',
      '&:hover' :{
        backgroundColor: "#AC5102",
      }
      

  },
 
  form:{
    backgroundColor:'white',
   
    
  
  },
  h2: {
   fontFamily: 'Kalam',
    marginLeft: '90px',
    marginRight: '100px',
    marginTop: '50px',
    paddingRight: '70px',
    paddingLeft: '70px',
    paddingBottom:'40px',
    marginBottom: '50px',
    fontSize: '2.5em'
  },
  input1withicon:{
    position:'relative',
  },
  font1:{
    position:'absolute',
    top: '16px',
    left: '40px',
    fontSize: '29px',
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory(); 
 
 function formPreventDefault(e) {
 
  e.preventDefault();
}
  
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    async function Verify(){
      
        axios.post('http://localhost:8088/user/login', {
        "email": Email,
        "password": Password
      })
        .then(function (response) {
         
          if (!response.data.user.msg)
          {
          swal("Successful Login!", "", "success");   
          let token = response.data.user.tokens[0].token;          
          localStorage.setItem("jwt", token);                  
          history.push("/DoctorHome");
        }
        else{
          swal("Invalid Login!", "", "error");
      }
          
        })
        .catch(function (error) {
          
          console.log(error);                   
          
        });
      /*axios.post("http://localhost:8088/user/").then(response => {
        setText(response.data.text);
        setAuthor(response.data.author);
      });*/
      
    }
  return (
    <Grid container component="main"  >
 
      <div style={{display: 'flex',flexDirection: 'row',margin: 'auto',marginTop: '5em',padding: '3em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)'}}>
      <img src="female.jpg" alt="" style={{maxWidth: '40em',height: '40em'}}></img>
      <Form className={classes.form} onSubmit={formPreventDefault}>
      <h2 className={classes.h2}>Doctor Login</h2>
      <div className={classes.input1withicon}>
      <Form.Control type="email" placeholder="Email" value={Email} onChange={(e) =>setEmail(e.target.value)}className={classes.input1} />
      <FontAwesomeIcon icon={faEnvelope} className={classes.font1}/>
      </div>
      <div className={classes.input1withicon}>
      <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) =>setPassword(e.target.value)} className={classes.input1} />
      <FontAwesomeIcon icon={faLock} className={classes.font1}/>
      </div>
     
       <Button variant="primary" type="submit" className={classes.button1} style={{fontFamily: 'Poppins',fontSize: '21px'}} onClick={Verify}>
    Login
  </Button>
    <h4 style={{textAlign: 'center',marginTop: '2em',color: 'grey',fontSize: '1.1em',fontFamily: 'Poppins'}}>Forgot Password?</h4>
      </Form>
      </div>
    </Grid>
    
  );
}
