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
import { Link, useLocation } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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



export default function Checklists() {

    const classes = useStyles();
    const history = useHistory(); 
    const location = useLocation();
    const [Tags,setTags] = useState([])
    const [Tags2,setTags2]= useState([])
    const [checklists,setChecklists] = useState([])
    const [checklists2,setChecklists2] = useState([])
    const [Allnames,setAllnames] = useState([])
    const [key,setKey] = useState('')
    const [size,setSize] = useState(0)
    const [order,setOrder] = useState('')
    const [category,setCategory] = useState('')
    const [forward,setForward] = useState(0)
    const [backward,setBackward] = useState(0)
    const [max,setMax] = useState(true)
    const [min,setMin] = useState(false)
    const [perpage,setPerpage] = useState(0)
    const [Tagen,setTag] = useState('')



    function moveforward(){

        let f = forward
        f=f+5
        setForward(f)
        let fmax = f+5
        
        axios.get('http://localhost:8088/ShowPublicChecklists').then(function(response){


            let rel = response.data.result.records
            let check = []

            for ( var l=f;l<=fmax-1;l++)
            {
                check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})

            }
            setChecklists(check)
            
            if ( fmax >= rel.length)
            {
                setMax(false)
            }
            
           setMin(true)
            
            })

            
           
               
    }

    function movebackward(){

        let f = forward
        f=f-5
        setForward(f)
        
        
        axios.get('http://localhost:8088/ShowPublicChecklists').then(function(response){


            let rel = response.data.result.records
            let check = []

            for ( var l=f;l<=f+1;l++)
            {
                check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})

            }
            setChecklists(check)

           
          
            
            })
            setMax(true)
            
            if ( f === 0)
            {
                setMin(false)
            }
               
    }
    function viewedcount(){

        let newtag = Tagen 


        if (location.state!==undefined)
        {
             setTag(location.state.tagname)
             newtag=location.state.tagname
             
             
        }

        
        
         
        
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
                    setTags2(tag)
                   
                   tag.sort(function(a, b) {
                        var keyA = a.count,
                         keyB = b.count;
                        // Compare the 2 dates
                        if (keyA < keyB) return 1;
                        if (keyA > keyB) return -1;
                        return 0;
                      });
                      let tags = []

                      for(var i=0;i<=4;i++) 
                      {
                            tags.push(tag[i].name)
                      }

                      
                    setTags(tags)

                   
                    
                    axios.get('http://localhost:8088/ShowPublicChecklists').then(function(response){

                        let rel = response.data.result.records
                        let check = []
                        let check2 = []

                        
                       
                        for ( var l=forward;l<=5-1;l++)
                        {
                            check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})
                        }

                          
                        for ( var m=0;m<=rel.length-1;m++)
                        {
                            check2.push({'fields' : rel[m]._fields[0].properties,'id':rel[m]._fields[0].identity.low})
                        }
                        
                        
                        setChecklists(check)
                        setChecklists2(check)
                        setSize(rel.length)
                        
                        setPerpage(rel.length/5)

                        let allnames = []
                        for(var i=0;i<=check2.length-1;i++)
                        {
                            let obj = {
                                'name' : check2[i].fields.title
                            }
                            allnames.push(obj)
                        }
                       
                       
                        for(var k=0;k<=tag.length-1;k++)
                        {
                            allnames.push(tag[k])
                        }
                        
                      
                        setAllnames(allnames)
                       
                       

                       
                      if (newtag !== '' )
                      {
                         
                        axios.post('http://localhost:8088/findtag',{'title':newtag}).then(function(response){
                            let rel2 = response.data.result.records
                            
                            let arr = []

                            for (var l=0;l<=rel2.length-1;l++)
                            {
                                 arr.push({'fields' : rel2[l]._fields[0].properties,'id':rel2[l]._fields[0].identity.low})
                            }
                
                            axios.post('http://localhost:8088/findchecklist',{'title':newtag}).then(function(response){
           
                                
                               let rel = response.data.result.records
                               
                               
                               for (var i=0;i<=rel.length-1;i++)
                               {
                                   arr.push({'fields' : rel[i]._fields[0].properties,'id':rel[i]._fields[0].identity.low})
                               }


                              setChecklists(arr)
                              setSize(arr.length)
                              
                            })
                              
                        }) 
                      }
                     
                    })
                
                    
               })
               
    }

    function filter(name)
    {
        axios.post('http://localhost:8088/MatchByTag',{'tag':name}).then(function(response){

            let res = response.data.result.records

            let arr = []
            for(var i =0;i<=res.length-1;i++)
            {
                arr.push(res[i]._fields[0].properties)
            }

            setChecklists(arr)
            setSize(arr.length)
        })
    }


   

    
    function search(){

            let title = key.name
            
          
        axios.post('http://localhost:8088/findchecklist',{'title':title}).then(function(response){
           
            let Arr1 = []
           let rel = response.data.result.records
           
           
           for (var i=0;i<=rel.length-1;i++)
           {
               Arr1.push({'fields' : rel[i]._fields[0].properties,'id':rel[i]._fields[0].identity.low})
           }

           console.log(Arr1)
           axios.post('http://localhost:8088/findtag',{'title':title}).then(function(response){
            let rel2 = response.data.result.records
            
            for (var l=0;l<=rel2.length-1;l++)
            {
                Arr1.push({'fields' : rel2[l]._fields[0].properties,'id':rel2[l]._fields[0].identity.low})
            }


           

            let NewArr = Arr1
            if (category === 'General')
            {
               NewArr = Arr1.filter(e => e.type === "General");
            }

            if (category === 'kids')
            {
               NewArr = Arr1.filter(e => e.type === "kids");
            }

            if (category === 'neurogiolist')
            {
               NewArr = Arr1.filter(e => e.type === "neurogiolist");
            }

            if (category === 'Other')
            {
               NewArr = Arr1.filter(e => e.type === "Other");
            }
            
            setChecklists(NewArr)
            setSize(Arr1.length)
            history.push({
                pathname: "/Checklists/",
                search: title,
                state: { tagname: title }
            });

        })

        
       
    })

}

   
        function  handleChange(e) {
            

            if (e === 'Name A..Z')
            {

                let check = [...checklists]
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

                let check = [...checklists]
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

                let check = [...checklists]
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

                let check = [...checklists]
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

                let check = [...checklists]
                check.sort(function(a, b) {
                   
                    if (Number(a.views)< Number(b.views)) return 1;
                    if (Number(a.views) > Number(b.views)) return -1;
                    return 0;
                  });
                  setChecklists(check)
                 
            }
          

    }

    function moves(e){
       
        axios.get('http://localhost:8088/ShowPublicChecklists').then(function(response){


            let rel = response.data.result.records
           

            if (e === 1)
            {
                let check = []
                for ( var l=0;l<5;l++)
                {
                    check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})
    
                }
                setChecklists(check)
            }

            else {
                let check = []
                let next = e+(e-1)
                for ( l=next-1;l<next+1;l++)
                {
                    check.push({'fields' : rel[l]._fields[0].properties,'id':rel[l]._fields[0].identity.low})
    
                }
                setChecklists(check)
            }
          
           

          
            
            })
    }
 
    function showdrprofile(dname){

        localStorage.setItem("Docname", dname); 
        history.push("/DrProfile");

    }
    function showchecklist(id,title)
    {

       
        localStorage.setItem("id", id); 
       
        history.push(`/checklist/${title}`);

    }
    useEffect(() => {
        viewedcount();
        
       
    },[]);

    
    const items = Allnames
    
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setKey(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return item;
        //To format result as html
      }
    return (
        <div style={{background: 'rgb(137 204 228)'}}>
             <Grid  component="main" >
             <div className={classes.div1} style={{padding: '2em',background: 'rgb(15, 139, 184',textAlign: 'center'}} >
                
                <Row className="justify-content-md-center" style={{display: 'flex',flexDirection: 'column'}}>
                    <Col style={{display: 'flex',flexDirection: 'column'}}>
                    <h2 style={{color:'white',fontFamily: 'Righteous',fontSize: '3.5em',marginBottom: '-0.1em'}}>Welcome To Site Name !</h2>
                    </Col> 
                    <Col style={{display: 'flex',flexDirection: 'column'}}>
                    <h2 style={{color:'white',fontFamily: 'Righteous',fontSize: '3.5em',marginBottom: '-0.1em'}}>Welcome To Site Name !</h2>
                    </Col> 

                    <Col style={{display: 'flex',flexDirection: 'column'}}><div style={{maxWidth: '20em',background: 'azure',marginLeft: '41%',marginTop: '2em'}}>hey</div></Col>           
                </Row>

                </div>
            <Row className="justify-content-md-center" >
            <Button className={classes.button1} style={{fontFamily: 'Inter',padding: '1.5em 3em',marginTop: '1em',borderRadius: '80%',fontSize: '1.5em',background: 'cadetblue' }}>Browse Checklists</Button>
            </Row>

        <Row className="justify-content-md-center" style={{marginTop:'3.5em'}}>{Tags.map((tag,i) =>{return(  
               <Col md={1} style={{maxWidth: 'fit-content',padding: '0.5em'}}>
                    <button type='button' style={{fontSize: '1.2em',border: 'none',padding: '0.1em 1.4em',borderRadius: '10em'}} onClick={(e => filter(tag))}>{tag}</button>
               </Col>
             )})}
           </Row>

          
            <Form className={classes.form}>
          
            <Row className="justify-content-md-center" style={{marginTop:'1em'}}>
                        <div style={{display: 'flex'}}>
                        <Form.Control as="select"    value={category} onChange={(e) =>setCategory(e.target.value)} className={classes.input1} style={{background: 'cadetblue',color: 'white',borderRadius: '10px',height: '2.8em',width: "7em",border: "none",marginTop:'0.5em'}}>
                       
                       <option selected="true" style={{}} >All</option>
                       <option>General</option>
                       <option>neurogiolist</option>
                       <option>kids</option>
                       <option>Other</option>
                       </Form.Control> 
                            <div style={{ width: '700px',marginTop: '0.4em',marginLeft: '0.9em'}}>
            <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            inputSearchString = {Tagen}
            
          />
        </div>  
        
       
                            <Button variant="primary" type="button"  style={{fontFamily: 'Poppins',padding: '0.1% 2.4%',fontSize: '1em',marginLeft:'0.60em',background:'cadetblue',borderRadius: '5em'}} className={classes.button2} ><span style={{fontFamily: 'Inter'}} onClick={search}>Search</span></Button>
                        </div>
                            
                        
                        
            </Row>
            </Form>
          
            <Container style={{backgroundColor:'azure',marginTop:'3em',paddingBottom:'0em',borderRadius:'1em'}}>
                
                <Row style={{border: '1px solid #ebebeb',paddingBottom: '1em',background:'white'}}>
                <Col><h1 style={{fontSize:'1.1em',lineHeight: '30px',paddingTop:'1em',fontFamily: 'Poppins',color:'grey'}}>There are <span style={{color:'black',fontWeight:'bold'}}>{size}</span> products.</h1></Col>
               
                        <Col>
                        <h6 style={{position: 'absolute',top: '1.1em',left: '8em',fontSize: '1.3em',fontFamily: 'Poppins',color:'grey'}}>Sort By:</h6>
                            <Form.Control as="select" className={classes.input1}  onChange={(e) =>handleChange(e.target.value)} style={{marginRight: '0',marginTop: '1em',width: '18em',background:"rgb(137, 204, 228)",borderRadius: '7px', fontFamily: 'Poppins',fontSize: '1em',height: '2.4em',float:"right",border: "none"}}>
                            <option selected="true" disabled="disabled"></option>
                            <option >Name A..Z</option>
                            <option>Name Z..A</option>
                            <option>Oldest</option>
                            <option>Newest</option>
                            <option>Most Viewed</option>
                            </Form.Control>
                            </Col>
                      
                
                </Row>
                <Row style={{border: '1px solid #ebebeb',paddingBottom: '1em',background:'white',paddingTop: '1em',marginTop: '1em'}}>
                    <Col><h6 style={{paddingTop: '0.5em'}}>Showing 1-24 Of 58 Item (S) </h6></Col>
                    <Col style={{textAlign: 'right'}}>
                    <ul style={{}}>
                    {min?                       
                        <li style={{display: 'inline'}} ><a onClick={movebackward} href  style={{cursor:'pointer', background: '#222',color: '#fff',textAlign: 'center',fontWeight: 'normal',margin: '0',padding: '8px 10.1px 8px 10.1px',width: '35px',lineHeight: '24px',fontSize: '15px',borderRadius: '5px',textDecoration: 'none',transition: '0.3s ease'}}><ArrowBackIosIcon style={{fontSize: '0.9rem'}}></ArrowBackIosIcon></a></li>:null}
                    {[...Array(perpage)].map((e, i) => {
                        return ( 
                            <li key={i} style={{display: 'inline'}}><a  onClick={e => moves(i+1)} rel=""  href style={{cursor: 'pointer',background: '#222',color: '#fff',textAlign: 'center',fontWeight: 'normal',margin: '0',padding: '8px 14px 8px 14px',width: '35px',lineHeight: '24px',fontSize: '15px',borderRadius: '5px',textDecoration: 'none',transition: '0.3s ease',marginLeft:'0.4em',}} >{i+1}</a></li>     
                         ) })}
                         {max?
                        <li style={{display: 'inline'}}><a onClick={moveforward} href style={{cursor:'pointer',background: '#222',color: '#fff',textAlign: 'center',fontWeight: 'normal',margin: '0',padding: '8px 10.1px 8px 10.1px',width: '35px',lineHeight: '24px',fontSize: '15px',borderRadius: '5px',textDecoration: 'none',transition: '0.3s ease',marginLeft:'0.4em'}}>< ArrowForwardIosIcon style={{fontSize: '0.9rem'}}/></a></li>:null}
                       
                    </ul>

                    
                    </Col>
                </Row>
                <Row>
                    {checklists.map((checklist,i) =>{return ( 
                    <div style={{marginBottom: '40px',marginTop: '40px',paddingLeft: '1.4em'}}>
                        <div id="qr" style={{height:'3.8cm'}} >
                            <img alt="" src={checklist.fields.image}  onClick={e =>showchecklist(checklist.id,checklist.fields.title)} style={{cursor:'pointer',width:'12em',height:'10em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)',float:'left'}}/>
                            <div style={{float: 'right',marginLeft: '40px',maxWidth: '40em'}}>
                           
                                <h2 class="this" style={{cursor:'pointer',fontFamily: 'Righteous'}} onClick={e =>showchecklist(checklist.id,checklist.fields.title)}>{checklist.fields.title}</h2>
                                <p class="lead mb-4" style={{color:'#868282',fontSize:'15px',marginTop: '0.7em',maxHeight:'68px',overflow: 'hidden',fontFamily: 'Josefin Sans'}} >{checklist.fields.description} </p>
                                <a href="ww" style={{marginRight: '18px',display: 'inline-block',color: '#f5681b',textDecoration: 'none',fontSize:'18px'}} ><FontAwesomeIcon icon={faEye} style={{marginRight: '5px'}}/>{checklist.fields.views}</a>
                                <a href="ww" style={{marginRight: '18px',display: 'inline-block',color: 'rgb(95 158 160)',textDecoration: 'none',fontSize:'18px'}} >{checklist.fields.type}</a>
                                <a href style={{cursor: 'pointer',marginRight: '18px',display: 'inline-block',color: 'rgb(95 158 160)',textDecoration: 'none',fontSize:'18px'}} onClick={e =>showdrprofile(checklist.fields.Doctorname)}>{checklist.fields.Doctorname}</a>
                                <a href="ww" style={{marginRight: '18px',display: 'inline-block',color: 'rgb(95 158 160)',textDecoration: 'none',fontSize:'18px'}} >{checklist.fields.DateCreated}</a>
                            </div>
                        </div>
                    </div>

                  
                    )})}
                </Row>
                
                        
            </Container>
            
            </Grid>
        </div>
    )
}
