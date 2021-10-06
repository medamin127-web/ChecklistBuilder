import React ,{useState,useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { faChevronDown,faPlus,faChevronUp,faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({



    button1:{
        background: '#44CCFF',
        '&:hover' :{         
            backgroundColor:'#3eba7b'         
          },
    },

    title:{
        color:'black',
        '&:hover':{
            color:'#3eba7b'  
        }
    }
}))

export default function Home() {
    const classes = useStyles();
    
    const  [show, setShow] = useState(false);
    const [Latest,setLatest] = useState([])
    const [Viewed,setViewed] = useState([])
    const history = useHistory(); 

    function showchecklists (){

        axios.get('http://localhost:8088/ShowPublicChecklists').then(function(response){
            
        let rel = response.data.result.records
        let check = []
        
        for ( var i=0;i<=rel.length-1;i++)
            {
                let obj = {
                    "image":rel[i]._fields[0].properties.image,
                    "DateCreated":rel[i]._fields[0].properties.DateCreated,
                    "description":rel[i]._fields[0].properties.description,
                    "title":rel[i]._fields[0].properties.title,
                    "views":rel[i]._fields[0].properties.views,
                    "id":rel[i]._fields[0].identity.low
                }
                check.push(obj)
            }


            console.log(check)
            let latest =  check.sort(function(a, b) {
                   
                // Compare the 2 dates
                if (a.DateCreated< b.DateCreated) return 1;
                if (a.DateCreated> b.DateCreated) return -1;
                return 0;
              });

              
              setLatest(latest.slice(0,4))

            let Mostviewed =  check.sort(function(a, b) {
                   
                // Compare the 2 dates
                if (Number(a.views)< Number(b.views)) return 1;
                if (Number(a.views) > Number(b.views)) return -1;
                return 0;
              });

              setViewed(Mostviewed.slice(0,4))
                 
    })
    }
    function showchecklist(id,title)
    {
        localStorage.setItem("id", id); 
       
        history.push(`/checklist/${title}`);
    }
    useEffect(() => {
       showchecklists();
        
       
    },[]);
    return (
        <div style={{background: '#dae8ed'}}>
                <Grid  component="main" style={{margin: 'auto'}}>
                
                <Container style={{maxWidth:'90em'}} >
                <div className={classes.div1} style={{padding: '2em',background: 'rgb(59 140 215)'}} >
                    <Row className="justify-content-md-center">
                        <Col md='auto' style={{marginTop: '2.5em'}}>
                        <h2 style={{color:'white',fontFamily: 'Kalam',fontSize: '3.5em',marginBottom: '-0.02em'}}>Welcome To Symptom Checker</h2>
                        <h5 style={{textAlign: 'center',color: '#c2c2c2',fontSize:'1.3em',fontFamily:'Poppins'}}> Online Diagnosis Website </h5>
                        <Link to='/About' style={{textDecoration:'none'}}><Button className={classes.button1} style={{fontFamily: 'Righteous',background: '#44CCFF',width: '17em',height: '4em',color: 'white',fontSize:'1.2em',borderRadius:'50px',marginLeft: '24%',marginTop: '1.7em'}}>About Us</Button></Link>
                        </Col> 
                        <Col md={1}><div style={{position: 'relative',top: '2.9em'}}><img src="doctor10.png" alt="" style={{width: '19em',marginTop: '-4.5em'}}></img></div></Col>           
                    </Row>


                    </div>
                   
                    <div className={classes.div1} style={{padding: '2em',background: 'rgb(69 156 236)',marginTop: '2em'}} >
                <Row >
                    <Col md='auto' style={{marginTop: '2.5em',maxWidth: '31em',marginLeft: '4em'}}>
                
                    <h2 style={{color: '#1c3693',fontFamily: 'Poppins',fontSize: '2.5em'}}>Browse Through Our Checklists </h2>
                    <h6 style={{fontFamily: 'Poppins',marginTop: '1em',color: '#dafcff',maxWidth: '25em',lineHeight: '1.4em'}}>Checklists Build By Professional Doctors in various fields</h6>
                    <Link to='/Checklists' style={{textDecoration:'none'}}><button className={classes.button1} style={{fontFamily: 'Poppins',background: '#44CCFF',width: '11em',height: '3em',color: 'white',fontSize:'1.2em',marginTop: '1.7em',border:'none'}}>Browse</button></Link>
                    </Col> 
                    <Col>
                    <img alt="" src="/stethoscospe.png" style={{width: '30em',float: 'right',marginRight: '5em'}}/>
                    </Col>
                           
                </Row>


                </div>
                
                </Container>
                <Row>
                <Col md={2}> <div style={{marginTop: '3em',float: 'left',width: '80%'}}>
                    <div style={{
                  
                   
                   
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    background: 'rgb(68, 204, 255)',
                    cursor: 'pointer',
                    padding: '1.2em'}}>

            <span style={{marginLeft: '0.3em',fontFamily: 'Josefin Sans',fontSize: '1.3em'}}>Category</span>
            
            {!show? <FontAwesomeIcon icon={faChevronDown} style={{marginRight:'0.3em',fontSize: '1.6em',cursor: 'pointer',float:'right'}} onClick={function(){return setShow(!show)}} />:<FontAwesomeIcon icon={faChevronUp} style={{marginRight:'0.3em',fontSize: '1.6em',cursor: 'pointer',float:'right'}} onClick={function(){return setShow(!show)}} />}
            </div>
            {!show?            
            <ul style={{background: '#181818',padding: '2em',paddingTop: '1em'}}>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}} >General 10</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Covid 2</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Public Health 8</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Kids 3 </a></li>

            </ul>:null}

                
        </div>
        <div style={{float: 'left',width: '80%'}}>
                    <div style={{
                  
                   
                   
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    background: 'rgb(68, 204, 255)',
                    cursor: 'pointer',
                    padding: '1.2em'}}>

            <span style={{marginLeft: '0.3em',fontFamily: 'Josefin Sans',fontSize: '1.3em'}}>Tags</span>
            
            {!show? <FontAwesomeIcon icon={faChevronDown} style={{marginRight:'0.3em',fontSize: '1.6em',cursor: 'pointer',float:'right'}} onClick={function(){return setShow(!show)}} />:<FontAwesomeIcon icon={faChevronUp} style={{marginRight:'0.3em',fontSize: '1.6em',cursor: 'pointer',float:'right'}} onClick={function(){return setShow(!show)}} />}
            </div>
            {!show?            
            <ul style={{background: '#181818',padding: '2em',paddingTop: '1em'}}>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}} >General</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Covid</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Public Health</a></li>
                <li style={{listStyleType: 'none',marginBottom: '0.5em'}}><a href="www.google.com" style={{textDecoration: 'none',transition: '0.3s ease',color: '#fff',fontFamily: 'Poppins'}}>Kids</a></li>

            </ul>:null}

                
        </div>
        
        
        </Col>
        
                <Col md={8}> <h2 style={{textAlign:'center',maxWidth: 'max-content',textShadow: '2px 2px 2px black',marginLeft: '17.5%',background: '#44CCFF',padding:'0.6em',borderRadius:'100px',color:'white',fontFamily: 'Inter',margin: 'auto',marginTop: '1em',marginBottom: '2em'}}>Discover Our Checklists</h2>
                <Row style={{display: 'flex',flexDirection: 'column',marginTop:'5em',marginBottom:'3em',padding:'1em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)',background: 'rgb(69, 156, 236)',border: '3px solid white',borderRadius: '2em'}}>
                <Col md={12}>
                <h3 style={{fontFamily: 'Poppins',textAlign: 'center',color:'white'}}>Latest Checklists</h3>
                </Col>
                <Col style={{display: 'flex', textAlign: 'center',marginTop: '2em'}}>
                <Row style={{margin: 'auto',padding:'2em'}}>
                {Latest.map((latest,i) =>{return ( 
                       <Col style={{marginRight: '2em'}}><img alt=""  src={latest.image}style={{width: '17em',height: '13em',borderRadius: '2em',cursor:'pointer'}}  onClick={e =>showchecklist(latest.id,latest.title)}></img><div><h3 className={classes.title} style={{marginTop: '0.7em',fontFamily:'Poppins',cursor:'pointer'}} onClick={e =>showchecklist(latest.id,latest.title)}>{latest.title}</h3>
                       <h5 style={{float:'right',fontFamily:'Inter'}}><FontAwesomeIcon icon={faEye} style={{marginRight: '5px'}}/>{latest.views}</h5></div>
                       </Col>
                      
                       )})}
                       </Row>
                
                
                </Col>
                </Row>
                <Row style={{display: 'flex',flexDirection: 'column',marginTop:'5em',marginBottom:'3em',padding:'1em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)',background: 'rgb(69, 156, 236)',border: '3px solid white',borderRadius: '2em'}}>
                <Col md={12}>
                <h3 style={{fontFamily: 'Poppins',textAlign: 'center',color:'white'}}>Most Viewed Checklists</h3>
                </Col>
                <Col style={{display: 'flex', textAlign: 'center',marginTop: '2em'}}>
                <Row style={{margin: 'auto',padding:'2em'}}>
                {Viewed.map((viewed,i) =>{return ( 
                       <Col style={{marginRight: '2em'}}><img alt=""  src={viewed.image} style={{width: '17em',height: '13em',borderRadius: '2em',cursor:'pointer'}} onClick={e =>showchecklist(viewed.id,viewed.title)}></img><div><h3 className={classes.title} style={{marginTop: '0.7em',fontFamily:'Poppins',cursor:'pointer'}} onClick={e =>showchecklist(viewed.id,viewed.title)}>{viewed.title}</h3>
                        <h5 style={{float:'right',fontFamily:'Inter'}}><FontAwesomeIcon icon={faEye} style={{marginRight: '5px'}}/>{viewed.views}</h5></div></Col>
                       )})}
                   </Row>
                
                
                </Col>
                </Row>
                </Col>
                </Row>
               
                  
                       
                   

                   
                </Grid>
        </div>
    )
}
