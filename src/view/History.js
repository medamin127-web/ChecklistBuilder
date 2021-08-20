import React from 'react'
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
    return (
        <div className={classes.root}>
            <Grid  component="main" >
            
                <Row fluid style={{background: 'aliceblue'}}>
                <Col sm="12" md={{ size: 6, offset: 5 }}>                  
                    <img alt="" src="history.png" style={{width: '3em',float:'left',marginRight: '0.3em'}}/>
                    <h2 style={{fontFamily:'Cairo',marginTop: '0.3em',fontSize: '1.7em'}}>Users History</h2> 
                
                </Col>
                <Col ><div style={{float: 'right',marginRight: '4em',marginTop: '0.5em'}}><Link style={{fontSize: '1.5em',padding: '0.5em',color: 'rgb(161, 206, 173)',textDecoration:'none'}}><FontAwesomeIcon icon={faChartBar} className={classes.font1}/><span style={{marginLeft: '5px'}}>Stats</span></Link>
                    <Link style={{fontSize: '1.5em',padding: '0.5em',color: 'rgb(161, 206, 173)',textDecoration:'none'}}><FontAwesomeIcon icon={faFilter} className={classes.font1}/><span style={{marginLeft: '5px'}}>Filter</span></Link></div></Col>
                </Row>
            
            <Container style={{marginTop:'0.5em'}}>
            <Row  className="justify-content-md-center" style={{backgroundColor:'#A1CEAD',padding:'1em',borderRadius: '100px'}}>
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>ID</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',color: 'white'}}>Name</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',color: 'white'}}>Checklist</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',color: 'white'}}>Age</h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',color: 'white'}}>Date</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',color: 'white'}}>Results</h4></Col>
                </Row>
             </Container> 
              <Container style={{marginTop:'0.4em',backgroundColor:'white',borderRadius: '50px',padding:'1em'}}>
                 <Row  className="justify-content-md-center"  style={{marginBottom:'2.2em'}} >
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>0</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Luke Skywalker</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Checklist1</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>27 </h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>4/10/2021</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Corona</h4></Col>
                </Row>
                <Row  className="justify-content-md-center"  style={{marginBottom:'2.2em'}}>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>1</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Luke Skywalker</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Checklist2</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>27 </h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>4/10/2021</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Corona</h4></Col>
                </Row>
                 <Row  className="justify-content-md-center"  style={{marginBottom:'2.2em'}}>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>2</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Luke Skywalker</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Checklist3</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>27 </h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>4/10/2021</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Corona</h4></Col>
                </Row>

                 <Row  className="justify-content-md-center"  style={{marginBottom:'2.2em'}}>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>3</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Luke Skywalker</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Checklist4</h4></Col>
                <Col md={2}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>27 </h4></Col>
                <Col md={1}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>4/10/2021</h4></Col>
                <Col md={3}><h4 style={{textAlign:'center',fontFamily: 'Cairo',fontSize: '1.3em'}}>Corona</h4></Col>
                </Row>               
              </Container> 
              <Container>
                  <Row style={{marginTop: '1em'}}> 
                <Col md={6}><Button style={{float: 'right',background: '#2EB837',color: 'aliceblue',fontFamily: 'Inter',padding: '0.5em 1.2em'}}>Prev</Button></Col>
                <Col md={6}><Button style={{background: '#2EB837',color: 'aliceblue',fontFamily: 'Inter',padding: '0.5em 1.2em'}}>Next</Button></Col>
                </Row>
              </Container>
            </Grid>

        </div>
    )
}
