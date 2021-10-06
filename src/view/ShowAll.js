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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import jwt_decode from "jwt-decode";



const useStyles = makeStyles((theme) => ({

   
    root:{
        
        height:'100vh',
        backgroundColor:'#C1F0D1',
        
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
        fontFamily: 'Righteous',
        fontSize: 'larger',
        fontWeight: 'bold',
        height: '55px',
        borderRadius: '5%',
        
        
        fontSize: '1.6em',
        lineHeight: '1.35',
        borderRadius: '50px',
        
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
    }

}))



export default function ShowAll() {
    const classes = useStyles();
    const history = useHistory(); 
    const [show, setShow] = useState(false);
    const [Checklists,setChecklists] = useState([]);
    const [type,setType] = useState();
    const [Visibility,setVisibility]= useState();
    const [filter,setFilter] = useState({})
    const [option,setOption] = useState(false);
    const [Allnames,setAllnames] = useState([])
    const [key,setKey] = useState('');
    const [input,setInput] = useState('');
    const [name,setname] = useState();

    function change(){
        
            setShow(!show)
                
    }
  
    function showchecklists(){

        let user={};
        let token = localStorage.getItem("jwt");
            var decoded = jwt_decode(token);
            user = decoded;
           
            setname(user.name);

        axios.post('http://localhost:8088/ShowChecklists',{'Doctorname':user.name}).then(function (response) { 

  
        let cont = response.data.result.records
       
        
        let list2 = []
        for(var i=0;i<=cont.length-1;i++){

            let obj = {
                'title':cont[i]._fields[0].properties.title,
                'description':cont[i]._fields[0].properties.description,
                'image':cont[i]._fields[0].properties.image,
                'type':cont[i]._fields[0].properties.type,
                'visibility':cont[i]._fields[0].properties.visibility,
                'DateCreated':cont[i]._fields[0].properties.DateCreated,
                'id':cont[i]._fields[0].identity.low
                
            }

            list2.push(obj)
            console.log(list2)
        }
        
        setChecklists(list2)

        axios.get('http://localhost:8088/CountViews').then(function(res){

                    let rel = res.data.result.records 

                let tag = []
                    for(var j=0;j<=rel.length-1;j++)
                    {
                        let obj = {
                            'count' : rel[j]._fields[0].low,
                            'name' : rel[j]._fields[1],
                        }

                        tag.push(obj)

                    }
                    
                    let allnames = []
                    
                    for(var i=0;i<=list2.length-1;i++)
                        {
                            let obj = {
                                'name' : list2[i].title
                            }
                            allnames.push(obj)
                        }

                        for(var k=0;k<=tag.length-1;k++)
                        {
                            allnames.push(tag[k])
                        }

                        setAllnames(allnames)
                        

         }).catch(function (error) {
            
            console.log(error);                   
            
          });
    })
    }
    useEffect(() => {
        
        showchecklists();
       
    },[]);
    
    function filtering(){

        
        let filtrer = filter 
        let array1 = []
        let list2 = []
        let list3 = []
        let list4 = []

           
           

            if(!filtrer.visibility )
            {
               axios.post('http://localhost:8088/filtering2',{"type":filtrer.type}).then(function (response) {

                   let cont = response.data.result.records

                   for(var i=0;i<=cont.length-1;i++){

                       list4.push(cont[i]._fields[0].properties)
                   }
                   
                   
                   setChecklists(list4)
                }).catch(function (error) {
   
                   console.log(error);                   
   
                        });
            

           }

          
           
           if(!filtrer.type && filtrer.visibility !== null)
           {
               
               
               axios.post('http://localhost:8088/filtering3',{"visibility":filter.visibility}).then(function (response) {

                   let cont = response.data.result.records
                   console.log(cont)
                   for(var i=0;i<=cont.length-1;i++){

                       list3.push(cont[i]._fields[0].properties)
                   }
                   console.log(list3)
                   setChecklists(list3)
                    }).catch(function (error) {
   
                   console.log(error);                   
   
                        });
              
           
           }
           else
           {   
                   
                       axios.post('http://localhost:8088/filtering1',{"filtrer":filtrer}).then(function (response) {

                           let cont = response.data.result.records
                        
                           for(var i=0;i<=cont.length-1;i++){

                               list2.push(cont[i]._fields[0].properties)
                           }
                           console.log(list2)
                           setChecklists(list2)
                            }).catch(function (error) {
           
                           console.log(error);                   
           
                                });
                   
               
           }
                          
            


    }   
     

    function  handleChange(e) {
            let filtrer = filter

            filtrer.type = e
            setOption(true)
            setFilter(filtrer)

    }

    function  handleChange2(e) {
        let filtrer = filter

        filtrer.visibility = e
        setOption(true)
        setFilter(filtrer)
}

    function Edit(id){

        localStorage.setItem("id", id); 
        history.push("/EditChecklist");
    }


   
    function DeleteChecklist(id1){
       
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
           
           
            let apiUrl = 'http://localhost:8088/DeleteAchecklist/';  
            let indexOfArrayItem = Checklists.findIndex(i => i.id === id1);
           
            if (willDelete) {
            axios.post(apiUrl , {'id':id1}).then((result) => {
                
                Checklists.splice(indexOfArrayItem, 1);
              swal("Successful Deletion!", {
                icon: "success",
                
              });
              showchecklists()
            })
         } else {
            
            }
          });
    }


    function search(){

        let title = input

        
        
      if (title !== ''){
            axios.post('http://localhost:8088/findchecklist2',{'title':title}).then(function(response){
            
                let Arr = []
            let rel = response.data.result.records

            for (var i=0;i<=rel.length-1;i++)
            {
                Arr.push(rel[i]._fields[0].properties)
            }

            axios.post('http://localhost:8088/findtag2',{'title':title}).then(function(response){
                let rel = response.data.result.records
                
                for (var l=0;l<=rel.length-1;l++)
                {
                    Arr.push(rel[l]._fields[0].properties)
                }

                let NewArr = Arr

            if (type === 'General')
            {
               NewArr = Arr.filter(e => e.type === "General");
            }

            if (type === 'kids')
            {
               NewArr = Arr.filter(e => e.type === "kids");
            }

            if (type === 'neurogiolist')
            {
               NewArr = Arr.filter(e => e.type === "neurogiolist");
            }

            if (type === 'Other')
            {
               NewArr = Arr.filter(e => e.type === "Other");
            }
            
            let NewNewArr = NewArr
            if (Visibility === 'Public')
            {
                
                NewNewArr = NewArr.filter(e => e.visibility === "Public");
            }

            if (Visibility === 'Private')
            {
                
                NewNewArr = NewArr.filter(e => e.visibility === "Private");
            }

            if (Visibility === 'Unfinished')
            {
                NewNewArr = NewArr.filter(e => e.visibility === "Unfinished");
            }

            setChecklists(NewNewArr)
                
    })

   
        })
    }
            else
            {
                console.log('life')
            } 
            
}
    function  sorting(e) {
            

        if (e === 'Name A..Z')
        {

            let check = [...Checklists]
            check.sort(function(a, b) {
               
                // Compare the 2 dates
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
              });
              setChecklists(check)
             
        }
        if (e === 'Name Z..A')
        {

            let check = [...Checklists]
            check.sort(function(a, b) {
               
                // Compare the 2 dates
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return 0;
              });
              setChecklists(check)
             
        }
        if (e === 'Oldest')
        {

            let check = [...Checklists]
            check.sort(function(a, b) {
               
                // Compare the 2 dates
                if (a.DateCreated< b.DateCreated) return -1;
                if (a.DateCreated > b.DateCreated) return 1;
                return 0;
              });
              setChecklists(check)
             
        }
        if (e === 'Newest')
        {

            let check = [...Checklists]
            check.sort(function(a, b) {
               
                // Compare the 2 dates
                if (a.DateCreated< b.DateCreated) return 1;
                if (a.DateCreated > b.DateCreated) return -1;
                return 0;
              });
              setChecklists(check)
             
        }

        if (e === 'Most Viewed')
        {

            let check = [...Checklists]
            check.sort(function(a, b) {
               
                // Compare the 2 dates
                if (a.views< b.views) return -1;
                if (a.views > b.views) return 1;
                return 0;
              });
              setChecklists(check)
             
        }
      

}




    return (
        <div style={{background:'rgb(182 230 202)',height:'110vh'}}>
            <Grid  component="main" >

            <Row className="justify-content-md-center" >
            <Button className={classes.button1} style={{fontFamily: 'Inter',padding: '1.5em 3em',marginTop: '1em',borderRadius: '80%',fontSize: '1.8em',background: '#2EB837' }}>List Of CheckLists</Button>
            </Row>
           

            <div>
            <Form className={classes.form}>
            <Row className="justify-content-md-center" style={{marginTop:'3.5em',marginBottom: "-1em"}}>
                        <Col md={4}>
                        <Form.Control className={classes.input1} value={input}  onChange={(e) =>setInput(e.target.value)} type="text" placeholder="Search..."   style={{marginBottom: "-1em",fontFamily: 'Inter',fontSize: '1.2em',height:"3.5em",borderRadius: "3em",border: "none",color:"black",marginLeft: "0.6em",paddingLeft:"2em"}} />
                        </Col>
                        <Button variant="primary" type="button"  style={{marginBottom:'2em',width: "1em",padding: "1% 3%",fontSize: "1em",marginLeft: "-9.7em",marginTop: "0.4em"}} className={classes.button2} onClick={search}>Search</Button>
                        
            </Row>
            <Row>
                <Col md={5}>
                    <Button variant="primary" type="button"  style={{padding: "1% ",fontSize: "1.2em",background: "#92b592",borderRadius: "3em",marginBottom: "2em",marginLeft: "88%"}} className={classes.button2} onClick={change} ><FontAwesomeIcon icon={faFilter} style={{ position: 'absolute',top:'1em',fontSize:"1.1em"}} /></Button>
                </Col>
            </Row>
                   
            {show?  
            <div>
                <Row>
                    <Col md={6}><Form.Control as="select"    value={type} onChange={(e) =>setType(e.target.value)}   className={classes.input1} style={{backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Inter',fontSize: '1em',height: '2.7em',float:"right",width: "13em",paddingLeft: "1em",border: "none",background: "#a6ccbc"}}>
                            <option selected="true" disabled="disabled" >Type</option>
                            <option>General</option>
                            <option>neurogiolist</option>
                            <option>kids</option>
                            <option>Other</option>
                            </Form.Control></Col>
                    <Col md={1}><Form.Control as="select"   value={Visibility} onChange={(e) =>setVisibility(e.target.value)}  className={classes.input1} style={{backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Inter',fontSize: '1em',height: '2.7em',border: "none",background: "#a6ccbc",width: "13em",paddingLeft: "1em"}}>
                            <option selected="true" disabled="disabled" >Visibilty</option>
                            <option>Public</option>
                            <option>Private</option>
                            <option>Unfinished</option>
                            </Form.Control></Col>
                           
                
                </Row>
            </div>
            :<div style={{padding:'0.5em'}}></div>}
            
            </Form>
            
            
            <Row className="justify-content-md-right" style={{marginTop:'1.5em'}}>
                        <Col md={12}>
                            <Form.Control as="select" className={classes.input1}onChange={(e) =>sorting(e.target.value)} style={{width:'10em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Poppins',fontSize: '1.1em',height: '2.7em',float:"right",marginRight: "2em",border: "none",background: "#a6ccbc"}}>
                            <option selected="true" disabled="disabled" >Sort By</option>
                            <option >Name A..Z</option>
                            <option>Name Z..A</option>
                            <option>Oldest</option>
                            <option>Newest</option>
                            <option>Most Viewed</option>
                            </Form.Control>
                        </Col>
                </Row>


            <div style={{marginTop:'3em',paddingBottom:'0em',borderRadius:'1em',marginBottom:"3em",zoom: '95%'}}>
               
                
                <Row style={{marginLeft: "20%"}}>{Checklists.map((Checklist,i) =>{return(  
              
              <div  className="card" style={{maxWidth: '23.9em',marginRight: '3em',border: 'none',marginBottom: '2em'}}>
               <img class="card-img-top" src={Checklist.image} style={{height: '235px',width:'23.80em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)'}} alt="Car"></img>
               <div class="card-body">
                   <Col style={{display: 'flex',flexDirection:'row'}}>
                        <h5 class="card-title" style={{marginLeft: '-0.9em',fontFamily:'Carter One',background: 'cadetblue',color: 'white',padding: '0.2em',maxWidth: 'fit-content',fontSize:'1.4em'}}>{Checklist.title}</h5>
                        <h5 style={{position: 'absolute',left: '13em',top: '0.4em',fontFamily: 'Poppins',color: 'grey'}} >4 views</h5>
                    </Col>
               <p class="card-text" style={{marginBottom: '1em',color:'grey',fontSize:'1em',fontFamily:'Poppins'}}>{Checklist.description}</p>
               <Row>
                        <Col  style={{display: 'flex',margin: 'inherit',paddingLeft: '0.3em'}}>
                        <Col  style={{display: 'flex'}} >
                        <FontAwesomeIcon icon={faEye} style={{fontSize: "1.3em",marginRight: '0.3em',color: 'rgb(86, 187, 153)'}}/><a href="www.google.com" className={classes.ahref}><h6 style={{fontFamily: 'Poppins',color: 'grey'}}>{Checklist.visibility}</h6></a>
                        </Col>
                        <Col  style={{display: 'contents'}}>
                    <FontAwesomeIcon icon={faCapsules} style={{fontSize: "1.3em",marginRight: '0.3em',color: 'rgb(86, 187, 153)'}}/><a href="www.google.com" className={classes.ahref}><h6 style={{fontFamily: 'Poppins',color: 'grey'}}>{Checklist.type}</h6></a>
                    </Col>
                    </Col>
                    <Col style={{margin:'0',padding:'0'}}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize: '1.3em',marginLeft: '3em',color: 'rgb(86, 187, 153)'}}/><h6 style={{fontFamily: 'Righteous',color: 'grey',float: 'right',marginTop:'0.1em'}}>{Checklist.DateCreated}</h6>
                    </Col>
                    </Row>
               
             </div>
             <div class="card-footer" style={{textAlign:'center',background: '#56bb99'}}>
             <Col style={{margin:'auto'}}>
                    <FontAwesomeIcon icon={faEdit} style={{fontSize:"2.5em",cursor:"pointer",color: 'cornsilk',marginRight:"1em"}} className={classes.trash} onClick={e => Edit(Checklist.id)} />
                    <FontAwesomeIcon icon={faTrash} style={{fontSize:"2.5em",cursor: "pointer",color: 'cornsilk'}} className={classes.trash} onClick={e => DeleteChecklist(Checklist.id)} />
               </Col>
            </div>
           </div>
              
                   
                    )})}
               </Row>
              
            </div>
            
            <div className="justify-content-md-center" style={{marginBottom: "3em"}}><Row style={{marginLeft: "50%",maxWidth: "fit-content",backgroundColor: "rgb(99, 212, 103)",padding:"0.3em 1.5em",margin:"auto",borderRadius: "0.5em"}}><FontAwesomeIcon  icon={faBackward} style={{ fontSize:"2em",marginRight: "1.5em",color: "white"}} /><FontAwesomeIcon icon={faForward} style={{ fontSize:"2em",color: "white"}} /></Row></div></div>
            </Grid>
        </div>
    )
}
