import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'


const useStyles = makeStyles((theme) => ({

    button1:{
        background: '#44CCFF',
        '&:hover' :{         
            backgroundColor:'#3eba7b'         
          },
    }
}))

export default function Home() {
    const classes = useStyles();
    return (
        <div >
                <Grid  component="main" className={classes.root}>
                <div className={classes.div1} style={{padding: '2em',background: 'rgb(15, 139, 184'}} >
                
                    <Row className="justify-content-md-center">
                        <Col md='auto' style={{marginTop: '2.5em'}}>
                        <h2 style={{color:'white',fontFamily: 'Righteous',fontSize: '3.5em',marginBottom: '-0.1em'}}>Welcome To Site Name !</h2>
                        <h5 style={{textAlign: 'center',color: '#c2c2c2',fontSize:'1.3em',fontFamily:'Cairo'}}> Online Diagnosis Website </h5>
                        <Link to='/DoctorHome' style={{textDecoration:'none'}}><Button className={classes.button1} style={{fontFamily: 'Righteous',background: '#44CCFF',width: '17em',height: '4em',color: 'white',fontSize:'1.2em',borderRadius:'50px',marginLeft: '24%',marginTop: '1.7em'}}>About Us</Button></Link>
                        </Col> 
                        <Col md={1}><div style={{position: 'relative',top: '2.9em'}}><img src="doctor10.png" alt="" style={{width: '19em',marginTop: '-4.5em'}}></img></div></Col>           
                    </Row>

                    </div>
                    <div style={{backgroundColor:'rgb(15, 139, 184',padding: '1em'}}>
                     <h2 style={{textAlign:'center',fontFamily:'Cairo',fontWeight:'500',color:'white',marginRight:'3em'}}>" Checklists Build By Professional Doctors In Various Fields "</h2>
                    </div>
                    <div>
                        
                        <h2 style={{textAlign:'center',margin:'1.1em',maxWidth: '65%',marginLeft: '17.5%',background: '#44CCFF',padding:'0.6em',borderRadius:'100px',color:'white',fontFamily:'Cairo'}}>Discover Our Checklists</h2>
                        <h3 style={{textAlign:'center',color:'grey',fontFamily: 'Inter',margin:'1em',marginTop: '3em'}}>Latest Checklists</h3>
                    </div>
                </Grid>
            
        </div>
    )
}
