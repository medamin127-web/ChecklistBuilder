import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faCheck, faSearch,faFilter,faEdit,faUnlock,faBackward,faForward,faEye,faCapsules,faCalendarAlt,faStethoscope,faExclamation} from '@fortawesome/fontawesome-free-solid'
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
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border:"none",
      borderRadius:"2%"

    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgb(74 64 64 / 75%)'
      },
  };


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
        backgroundColor:'rgb(40, 189, 247)',
        color:'white',
        fontFamily: 'Righteous',
        fontSize: 'larger',
        fontWeight: 'bold',
        padding: '1.2% 3%',
        fontSize: '1.1em',
        lineHeight: '1.35',
        fontWeight: '100',
       
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
        
        cursor: 'pointer',
        '&:focus' :{
            borderColor: '#ced4da',
            boxShadow: 'none',
            outline: 'none',
            background: '#f2f0f0',

          },
          '&:hover' :{
            backgroundColor:'rgb(163 229 255)'         
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
    title:{
        color: 'rgb(35, 35, 35)',
        '&:hover' :{
            color:'#57bcf6'
          },
    }

}))



export default function Checklists() {

    const classes = useStyles();
    const history = useHistory(); 
    const [checklist,setChecklist] = useState({})    
    const [tags,setTags] = useState([])
    const [suggestion,setSuggestion] = useState([])
    const [state,setState]= useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name,setName]= useState('')
    const [birthdate,setBirthdate]= useState('')
    const [gender,setGender]= useState('')
    const [city,setCity]= useState('')
    const [verify,setVerify] = useState(false)
    const [check1,setCheck1] = useState(true)
    const [check2,setCheck2] = useState(false)
    const [ChecklistID,setChecklistID] = useState()
    const [question,setQuestion] = useState([])
    const [answer,setAnswer] = useState([])
    const [id,setId] = useState()
    const [bgColor,setBjColor] = useState('#f2f0f0')
    const [answerChoice,setanswerChoice] = useState()
    const [clicked,setClicked] = useState(false)
    const [back,setBack] = useState(false)
    const[activeId,setActiveId] = useState()
    const location = useLocation();

    function openModal() {

        let vues = Number(checklist.views) + 1 

        axios.post('http://localhost:8088/UpdateViews',{"id":Number(ChecklistID),"views":vues.toString()}).then(function(response){
            
            
        })
        setIsOpen(true)
       
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
      }
    
      function closeModal() {
        setIsOpen(false);
      }



    function showchecklist(){
        let id = localStorage.getItem('id')
       

       
        axios.post('http://localhost:8088/ShowChecklist',{"Checklistid":Number(id)}).then(function(res){

            
            let cont = res.data.records
        
            setChecklistID(cont[0]._fields[0].identity.low)

            

            axios.post('http://localhost:8088/findtags',{"id":Number(id)}).then(function(response){

            let tags = [];
            let cont2 = response.data.result.records

            for (var i =0;i<=cont2.length-1;i++) 
            {
                    tags.push(cont2[i]._fields[0])

            }

            let obj1 = {
                'title':cont[0]._fields[0].properties.title,
                'description':cont[0]._fields[0].properties.description,
                'image':cont[0]._fields[0].properties.image,
                'type':cont[0]._fields[0].properties.type,
                'visibility':cont[0]._fields[0].properties.visibility,
                'DateCreated':cont[0]._fields[0].properties.DateCreated,
                'Doctorname':cont[0]._fields[0].properties.Doctorname,
                "views":cont[0]._fields[0].properties.views,
                'tags':tags
            }

            setTags(tags)
            setChecklist(obj1)
            
           axios.post('http://localhost:8088/findSuggestion',{'tags': tags,'id':Number(id)}).then(function(response){

                let res = response.data.result.records
                let arr2 = []
                
                for (var i=0;i<=res.length-1;i++)
                {
                   let obj = {
                    'title':res[i]._fields[0].properties.title,
                    'description':res[i]._fields[0].properties.description,
                    'image':res[i]._fields[0].properties.image,
                    'type':res[i]._fields[0].properties.type,
                    'visibility':res[i]._fields[0].properties.visibility,
                    'DateCreated':res[i]._fields[0].properties.DateCreated,
                    'Doctorname':res[i]._fields[0].properties.Doctorname,
                    'views':res[i]._fields[0].properties.views,
                    'id':res[i]._fields[0].identity.low,
                   }

                   arr2.push(obj)
                }

                const key = 'id'
                const arrayUniqueByKey = [...new Map(arr2.map(item =>
                    [item[key], item])).values()];
                  
                setSuggestion(arrayUniqueByKey)

                axios.post('http://localhost:8088/FirstQuestion',{"Checklistid":cont[0]._fields[0].identity.low.toString()}).then(function(response){

                
                setQuestion(response.data.result.records[0]._fields[0].properties)
                setId(response.data.result.records[0]._fields[0].identity.low.toString())

                    let answers = response.data.result.records[0]._fields[0].properties.answer

                    setAnswer(answers)


                    

                    
                })
            })
        })
        })

    }
    function show(id,title)
    {

        localStorage.setItem("id", id); 
        history.push(`/checklist/${title}`)
        window.location.reload()

    }

    function showdrprofile(dname){

        localStorage.setItem("Docname", dname); 
        history.push("/DrProfile");

    }

    function redirecttag(tag)
    {
            
        history.push({
            pathname: "/Checklists/",
            search: tag,
            state: { tagname: tag }
        });

        
    }

    function verifying(){

        if (name === '' ||  birthdate === '' || gender === '' || state === '' || city === '' )
        {
            setVerify(true)
        }

        if (name !== '' &&  birthdate !== '' && gender !== '' && state !== '' && city !== '' )
        {
            setVerify(false)
            let obj = {
                "name" : name,
                "birthdate" : birthdate,
                "gender" : gender,
                "state" : state,
                "city" : city
            }
    
            history.push({
                pathname: "/Checklist/",
                search: checklist.title,
                state: { user: obj }
            });

            console.log(location.state)
            setIsOpen(false)
            setCheck1(false)
            setCheck2(true)

        }

       
    }

    function nextquestion()
    {
         axios.post("http://localhost:8088/SearchResult",{'Checklistid':question.Checklistid,'Questionid':Number(id),'answer':answerChoice}).then(function(reponse){
            
         let length = reponse.data.result.records.length
         
         if(length === 0 )
            {
            axios.post("http://localhost:8088/NextQuestion",{'Checklistid':question.Checklistid,'Questionid':Number(id),'answer':answerChoice}).then(function(res){
               

                setId(res.data.result.records[0]._fields[0].identity.low.toString())
                setQuestion(res.data.result.records[0]._fields[0].properties)
                let answers = res.data.result.records[0]._fields[0].properties.answer
                setAnswer(answers)
                setanswerChoice()
                setBjColor('#f2f0f0')
                setBack(true)
            })
            }

        else {
            localStorage.setItem("Resultid", reponse.data.result.records[0]._fields[0].identity.low); 
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;

            var ageDifMs = Date.now() - Date.parse(birthdate);
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            var Age = Math.abs(ageDate.getUTCFullYear() - 1970);

                axios.post("http://localhost:8088/createHistory",{"Username":name,"Age":Age,"gender":gender,"state":state,"city":city,"ResultTitle":reponse.data.result.records[0]._fields[0].properties.title,"ChecklistName":checklist.title,"date":today,"ResultId":reponse.data.result.records[0]._fields[0].identity.low,"Doctorname":checklist.Doctorname}).then(function(reponse){
                    localStorage.setItem("DoctorName",checklist.Doctorname)
                    history.push("/Results");
                })

            
            

        }
            })

           
    }

    function changecolor(answerr,index){
        setBjColor('rgb(163 229 255)')
        console.log(answerr)
        setanswerChoice(answerr)
        setClicked(true)
        setActiveId(index)

    }

    function PreviousQuestion()
    {
        axios.post("http://localhost:8088/PreviousQuestion",{'Checklistid':question.Checklistid,'id':Number(id)}).then(function(res){
               
           
            setId(res.data.result.records[0]._fields[0].identity.low.toString())
            setQuestion(res.data.result.records[0]._fields[0].properties)
            let answers = res.data.result.records[0]._fields[0].properties.answer
            setAnswer(answers)
            setanswerChoice()

            axios.post("http://localhost:8088/PreviousQuestion",{'Checklistid':question.Checklistid,'id':res.data.result.records[0]._fields[0].identity.low}).then(function(reponse){
            
                let length = reponse.data.result.records.length
                console.log(length)
                if(length === 0 )
                {
                    setBack(false)
                }
                

             })
        })
    }

    
    useEffect(() => {
       showchecklist();
        
       
    },[]);

    return (
        <div style={{}} >
             <Grid  component="main" >
             {check1?<div style={{background:'rgb(234 234 234)'}}>
             <div className={classes.div1} style={{padding: '2em',borderRadius: '3em',textAlign: 'center'}}>
              <div>
                  <Row style={{fontFamily: 'Righteous',textAlign:'center',padding: '1em',margin:'0'}}>
                <Col md={7}><img alt='' src={checklist.image} style={{width: '70em',height: '42em',borderRadius: '2em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)'}}/></Col>
                <Col md={5}  >
                <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content'}}>Checklist Name:</span>
                  
                  <h4 style={{float: 'left',color: 'rgb(35, 35, 35)',textAlign: 'start',fontFamily: 'Poppins',marginLeft: '1em',marginBottom: '0.6em'}} >{checklist.title}</h4>
                    </Col>
                    <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                      
                        <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content'}}>Checklist Description:</span>
                  
                        <h4 style={{ float: 'left',fontSize: '1.4em',color: 'rgb(35, 35, 35)',textAlign: 'start',marginLeft: '1em',fontFamily: 'Poppins'}} >{checklist.description} </h4>
                    </Col>
                    <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                      
                        <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content'}}>Doctor Name:</span>
                  
                        <h4 style={{ float: 'left',fontSize: '1.4em',textAlign: 'start',marginLeft: '1em',fontFamily: 'Poppins',cursor: 'pointer'}} onClick={e =>showdrprofile(checklist.Doctorname)} className={classes.title} >{checklist.Doctorname}</h4>
                    </Col>
                    <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                      
                      <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content',marginBottom: '0.3em'}}>Date Created:</span>
                
                      <h4 style={{ float: 'left',fontSize: '1.4em',color: 'rgb(35, 35, 35)',textAlign: 'start',marginLeft: '1em',fontFamily: 'Poppins'}} >{checklist.DateCreated}</h4>
                  </Col>
                  <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                      
                      <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content'}}>Type:</span>
                
                      <button type='button' style={{border: 'none',padding: '0.3em 1em',background: 'rgb(148, 216, 207)',borderRadius: '50px',color: '#716969',maxWidth: 'fit-content',fontSize: '1.4em',fontFamily: 'Poppins',marginLeft: '1.2em'}}>{checklist.type}</button>
                  </Col>
                  <Col style={{display: 'inline-flex',flexDirection: 'column'}}>
                      
                      <span style={{fontSize: '1.9em',textAlign: 'start',fontFamily: 'Kalam',color: 'grey',maxWidth: 'fit-content'}}>Tags:</span>

                      <div style={{float: 'left',fontSize: '1.4em',color: 'rgb(35, 35, 35)',textAlign: 'start',marginTop: '0.2em',marginLeft: '1em',fontFamily: 'Poppins'}}>
                      {tags.map((tag,i) =>{return(  
                      <button type='button' style={{border: 'none',padding: '0.3em 1em',background: 'rgb(148, 216, 207)',borderRadius: '50px',color: '#716969',marginRight:'0.4em'}} onClick={e =>redirecttag(tag)}>{tag}</button> 
                      )})}
                      </div>
                  </Col>

                  <Col style={{display: 'inline-flex',flexDirection: 'column',marginTop: '3em'}}>
                    <Button type="button" style={{width: 'inherit',maxWidth: 'inherit',background: '#94d8cf',padding: '1em',fontSize: '20px',fontFamily: 'Poppins',margin: 'auto'}} onClick={openModal}> 
                   Click To Start</Button>
                  </Col>
                  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"  shouldCloseOnOverlayClick={false}>
        <Container style={{backgroundColor:'white',padding: '2em 8em 3em',paddingBottom:'0em',maxWidth: 'max-content'}}>
        <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>Fill The information Below</h2>
                        <Form style={{padding: '2em'}}>

                        <Form.Control type="text" placeholder="Enter Name..."  value={name}  onChange={(e) =>setName(e.target.value)} className={classes.input1} style={{border: 'none',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em',marginBottom: '1.5em'}} />
                        <Form.Control type="Date"  value={birthdate}  onChange={(e) =>setBirthdate(e.target.value)} className={classes.input1} style={{border: 'none',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px',fontFamily: 'Cairo',fontSize: '1.2em',marginBottom: '1.5em'}} />
    
                        <Form.Control as="select"  value={gender}  onChange={(e) =>setGender(e.target.value)} style={{border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >Sex</option>
                            <option>Male</option>
                            <option>Female</option>
                            </Form.Control>
                            <div style={{display: 'flex'}}>
                            <Form.Control as="select"   value={state} onChange={(e) =>setState(e.target.value)}  style={{border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >State</option>
                            <option>Sousse</option>
                            <option>Sfax</option>
                            <option>Monastir</option>
                            <option>Tunis</option>
                            </Form.Control>

                            {state==='Sousse' ?<Form.Control as="select" value={city}  onChange={(e) =>setCity(e.target.value)}  style={{marginLeft: '2em',border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >City</option>
                            <option>Hammam Sousse</option>
                            <option>Cite Riyadh</option>
                            <option>Sahloul</option>
                            <option>Khzema</option>
                            <option>Jawhra</option>
                            <option>Kalaa Kbira</option>
                            </Form.Control>:null}
                            
                            {state==='Monastir' ?<Form.Control as="select"  value={city}  onChange={(e) =>setCity(e.target.value)} style={{marginLeft: '2em',border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >City</option>
                            <option>Bekalta</option>
                            <option>Bembla Ezzit</option>
                            <option>Beni Hassen</option>
                            <option>Jemmal</option>
                            <option>Ksar Hellal</option>
                            <option>Ksibet el-Médiouni</option>
                            </Form.Control>:null}

                            {state==='Tunis' ?<Form.Control as="select" value={city}  onChange={(e) =>setCity(e.target.value)}  style={{marginLeft: '2em',border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >City</option>
                            <option>El Kabaria</option>
                            <option>Sidi Hassine</option>
                            <option>El Hrairia</option>
                            <option>El Omrane Supérieur</option>
                            <option>El Omrane</option>
                            <option>La Marsa</option>
                            <option>Le Bardo</option>
                            </Form.Control>:null}

                            {state==='Sfax' ?<Form.Control as="select"  value={city}  onChange={(e) =>setCity(e.target.value)} style={{marginLeft: '2em',border: 'none',width:'12em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Cairo',fontSize: '1em',height: '2.7em',marginTop: '1.5em'}}>
                            <option selected="true" disabled="disabled" >City</option>
                            <option>Sfax</option>
                            <option>Sakiet Ezzit</option>
                            <option>Chihia</option>
                            <option>Sakiet Eddaïer</option>
                            <option>Gremda</option>
                            </Form.Control>:null}

                            </div>

                            
                            <Col md={12} style={{textAlign: 'center'}}><Button variant="primary" type="button" onClick={verifying} style={{textAlign: 'center',background:"white",padding: "1em 1em",width: '9em',fontSize: '1.2em',marginTop:'2em',fontFamily: 'Poppins',border:'4px solid rgb(58, 183, 120)',color:'rgb(58, 183, 120)',borderRadius:'1em'}} label='Styled button' className={classes.button2}>Confirm</Button> <Button onClick={closeModal} style={{background: 'white',padding: '0.38em 2em',fontSize: '1.2em',width: '9em',marginTop: '1.9em',border:'4px solid rgb(209, 81, 81)',color:'rgb(209, 81, 81)',borderRadius:'1em'}}>close</Button></Col>
                            
                            {verify ? <div style={{display: 'flex',marginTop: '2em'}}>
                            <FontAwesomeIcon icon={faExclamation} style={{fontSize: "1.5em",marginRight: '0.3em',color: 'rgb(244 70 70)'}} />
                             <h5 style={{marginTop: '0.2em',color: '#d61f33'}}>You need to fill all the information above</h5>
                            </div>:null}
                        </Form>
            
        </Container>
        
      </Modal>
                </Col>
                
                </Row>

              </div>
             
              </div>
              <div className={classes.div1} style={{borderRadius: '2em', textAlign: 'center',marginTop:'3em'}}>
              <Row style={{marginTop:'4em',padding:'1em'}}>
                   <Col md={12} style={{padding: '2em'}}>
                   <h3 style={{fontFamily: 'Poppins',color: 'rgb(73 71 71)',margin: 'auto',background: 'rgb(148, 216, 207)',padding: '0.5em 15em',borderBottom:'8px solid #858585',textAlign: 'initial'}}>Related Checklists</h3>
                   </Col>
                   <Row style={{margin: 'auto',padding:'2em'}}> 
                   {suggestion.map((suggest,i) =>{return(  
                       <Col><img alt=""  src={suggest.image} style={{width: '25em',height: '17em',borderRadius: '2em',marginRight: '1em',cursor:'pointer'}}  onClick={e =>show(suggest.id,suggest.title)}></img>
                       <h3 style={{marginTop: '0.7em',fontFamily:'Poppins',textAlign: 'start',marginBottom:'0.5em',fontSize: '1.6em',cursor:'pointer'}}  onClick={e =>show(suggest.id,suggest.title)}>{suggest.title}</h3><div style={{display: 'flex'}}><div style={{display: 'flex',flexDirection: 'row'}}><FontAwesomeIcon icon={faStethoscope} style={{color:'rgb(72 205 187)' , fontSize: '2em'}}/><h6 style={{fontFamily:'Kalam',fontSize: '1.6em',marginTop: '0.1em',marginLeft: '0.1em'}}>{suggest.Doctorname}</h6></div><h6 style={{marginLeft: 'auto',marginRight: '1em',fontFamily:'Kalam',fontSize: '1.4em',marginTop:'0.3em'}}>{suggest.views} views</h6></div></Col>               
                       

                      )})}
                    </Row>
                   
              </Row> 
              </div>
              </div>:null}
              {check2?<div>

            <Row style={{height: '110vh',background:'#f0f8ff'}}>
              <Col style={{marginTop:'3em',paddingBottom:'0em',borderRadius:'1em'}}>
                    <Container style={{background: 'white',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 10%)',textAlign: 'center',padding:'4em'}}>
                        <div>
                            <h3 style={{color: '#565454',fontFamily: 'Overpass',marginBottom: '0.5em',fontSize: '2em'}}>{question.name}: {question.question}</h3>
                            {answer.map((answerArr, index) => {
                                return(<input type="text" Key={index} className={classes.input1} value={answerArr} readonly="readonly" style={{backgroundColor: (index === activeId ? bgColor : '#f2f0f0'),width:'60%',height:'3.5em',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter'}} onClick={e =>changecolor(answerArr,index)}></input>

                                 )})}
                        </div>
                        <hr style={{maxWidth: '100em'}}></hr>
                        <div>
                        <Button variant="primary" type="button" className={classes.button1} style={!back? {opacity: '50%',color: 'white',marginTop:'1em',background: '#7c7c7c'} : {background: '#7c7c7c',marginTop:'1em'}} disabled={!back} onClick={PreviousQuestion}>Back</Button>
                        <Button variant="primary" type="button" className={classes.button1} style={!answerChoice? {opacity: '50%',color: 'white',marginLeft:'60%',marginTop:'1em'} : {marginLeft:'60%',marginTop:'1em'}} onClick={nextquestion} disabled={!answerChoice}>Next</Button>
                        </div>
                        </Container>
              </Col>
              </Row>
              </div>:null}
            </Grid>

        </div>
       
    )
}
