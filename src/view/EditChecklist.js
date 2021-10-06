import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faWrench} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@material-ui/core';
import { CustomInput } from 'reactstrap';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { set } from 'mongoose';


const useStyles = makeStyles((theme) => ({

    root:{
        
        height:'100vh',
        backgroundColor:'#C1F0D1',
        
    },
    font1:{
        
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
        marginLeft: '40%',
        marginTop:'60px',
        padding: '5% 10%',
        fontSize: '1.6em',
        lineHeight: '1.35',
        borderRadius: '50px',
        
        '&:hover' :{
            color:'white',
            
            backgroundColor:'#3eba7b'         
          },
    },
    
    input1:{
        background: 'rgb(235, 235, 235)',
        transition: '0.3s all',
        '&:focus' :{
            
            outline: 'none'
          },
    },
    img1:{
        cursor: 'pointer',
        '&:hover' :{
            background: "url('plus1.png')"       
          },
        
    },
    invi:{

        display:'none'
    }

}))


export default function BuildQuestions() {

    const _ = require("lodash");
    const classes = useStyles();
    const history = useHistory(); 


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [inputList,setInputList] = useState([{Answer:""}])
    const [Question, setQuestion] = useState('');
    const [Nom,setNom]=useState(null);
    const [Answers,setAnswers] = useState([])
    const [choice , setChoice] = useState()
    const [total,setTotal] = useState([])
    const[Answers2,setAnswers2] = useState([])
    const [Result,setResult] = useState([])
    const [Verif,setVerif] = useState(true)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagelink, setImagelink] = useState('');
    const [Names,setNames] = useState([]);
    const [totalRel,setTotalRel] = useState([]);
    const [AArray,setAArray]= useState([]);
    const [NameQt,setNameQt] = useState([]);
    const [Checks,setChecks]= useState([]);
    const [Questions,setQuestions] = useState([]);
    const [Results,setResults] = useState([])
    const [countQt,setCountQt] = useState(1)
    const [countR,setCountR] = useState(1)
    const [Things,setThings] = useState([])
    const [Array5,setArray5] = useState([])
    const [Checklist,setChecklist] = useState({})
    const [verif1,setVerif1] = useState(false)
    const [verif2,setVerif2] = useState(false)
    const [verif3,setVerif3] = useState(false)
    const [verif4,setVerif4] = useState(false)
    const [Stuff,setStuff] = useState([])
    
    function verification() {
        setVerif1(true)
     }

     function verification2(){
        setVerif2(true)
     }
     function verification3(){
        setVerif3(true)
    }
    function verification4(){
        setVerif4(true)
    }
    const handleChange = (e, index) => {
        const {name, value} = e.target;
        
        const list = [...inputList]; 
        list[index][name]=value;

        setInputList(list);
    }

    function addrel (e,index,answer,name,Bname)
    {
        let tot = total
        let list2 = [];

        list2.push(e.target.value)
       setChoice(list2[0]);
        
       
        let rel = {
            name1:name,
            name2:list2[0],
            answer:answer,
            nameprev:''
        }


        if (Bname !==undefined) {

            rel.nameprev=Bname
        }

        
        let confirm = false 
        
        
        for (var i = 0;i<=tot.length-1;i++)
       {
                if (rel.name1===tot[i].name1 && rel.answer===tot[i].answer)
                {
                    tot[i]=rel
                    setTotal(tot)
                    confirm=true
                    break
                }
       }

       console.log(confirm)
        if (confirm===false)
        {
            let tot = total
            tot.push(rel)
            setTotal(tot)
            
        }
        console.log(total)
    }
        


    const handleAddInput = () =>{
        //setInputList([...inputList,{Answer:""}]);
        const list = [...inputList];
        list.push({Answer:""});
        setInputList(list);
    }
    const handleRemoveInput = index => {
            const list = [...inputList];
            list.splice(index,1);
            setInputList(list);
            

    }

    
    function AddQuestion (){
        let A1 = [];
        for (var i=0;i<=inputList.length-1;i++){
            A1.push(inputList[i].Answer)
        }
        let nom = Names  
        
        let Checklistid = localStorage.getItem('id')
        axios.post('http://localhost:8088/ShowQuestions',{"Checklistid":Checklistid})
        .then(function (response) {    
            let NewQuestions = []
            let obj = {
                "question":Question,
                "answer":A1,
                "name":"Q" +  (Number(AArray.length) + countQt),
                "num": AArray.length+countQt,
                "Checklistid":localStorage.getItem('id'),
            }

            
           nom.push(obj.name)
           setNames(nom)
            let counting = countQt + 1 
            setCountQt(counting)
            NewQuestions = Questions
            NewQuestions.push(obj)
            setQuestions(NewQuestions)
            
            console.log('success')
            setInputList([{Answer:""}])
            setQuestion('')
            setShow(!show)
            
            
    })
      
      
      .catch(function (error) {
        
        console.log(error);                   
        
      });
          
          
          
       
    }

    function AddResult(){
        let Checklistid= localStorage.getItem('id')
       
      axios.post('http://localhost:8088/ShowResults',{"Checklistid":Checklistid})
        .then(function (response) {    

            let NewResults= []
            let nom = Names  


           let obj1 ={
            "title": title,
            "description": description,
            "image": imagelink,
            "num": response.data.records.length+countR,
            "name": "R" +  (Number(response.data.records.length ) + countR),
            "Checklistid":localStorage.getItem('id')
           }

           nom.push(obj1.name)
           setNames(nom)
           
           let counting = countR + 1 
            setCountR(counting)
            NewResults = Results
            NewResults.push(obj1)
            setResults(NewResults)
            
   
       setTitle('')
       setDescription('')
       setImagelink('')
       setShow2(!show2)
      
      
      
          })
          .catch(function (error) {
            
            console.log(error);                   
            
          });
            
    
    }

   
    function addtwo(){
        let apiURL = "http://localhost:8088/Showme"
        let checkname = localStorage.getItem('id')
        let ChecklistTitle = localStorage.getItem('id')
   
   
       
        
       axios.post('http://localhost:8088/ShowQuestions',{"Checklistid":checkname})
       .then(function (response) {    
   

       
           let cont = response.data.records
          
   
           let list2 = [];
           let list1 = [];
           let list3 = [];
   
           for (var i=0; i<=cont.length-1;i++){
               list2.push(cont[i]._fields[0].properties)
               
           }
   
           axios.post('http://localhost:8088/ShowResults',{"Checklistid":ChecklistTitle}).then(function (response){
               
               let cont2 = response.data.records;
              
               for (var i=0; i<=cont2.length-1;i++){
                   list1.push(cont2[i]._fields[0].properties)
               }
               setResult(list1)
               
               for (var j=0;j<=list2.length-1;j++){
                  
                   list3.push(list2[j].name)
               }
               for (var l=0;l<=list1.length-1;l++){
                   list3.push(list1[l].name)
               }
               setNames(list3)
               
                // Don't set the state out of an async call cause it will set it before data change
             
                       
           
                           
                           let Array4 = []
                           axios.post('http://localhost:8088/ShowRelation6',{"Checklistid":ChecklistTitle}).then(function(response){
   
                            let connt = response.data.result.records
                            
                            let stuff = []
                           
                          

                           
                            for (var i=0;i<=connt.length-1;i++)
                            {
                                stuff.push(connt[i]._fields)
                            }
                        
                           
                            

                           axios.post('http://localhost:8088/ShowRelation5',{"Checklistid":ChecklistTitle}).then(function(response){
   
                            let connt = response.data.result.records
                            
                            let things = []

                            for (var i=0;i<=connt.length-1;i++)
                            {
                                things.push(connt[i]._fields)
                            }

                            console.log(things)
                            setThings(things)
                            let things1 = []
                            

                          
                            axios.post('http://localhost:8088/ShowRelation3',{"Checklistid":ChecklistTitle}).then(function(response){
               
                                let con3 = response.data.result.records
                                
                                let Results = []
                                
                               
                    
                                for( var j=0;j<=con3.length-1;j++){
                    
                                    let object1 = {
                                            "Aname":con3[j]._fields[0],
                                            "Aname1":con3[j]._fields[0],
                                            "Aquestion":con3[j]._fields[1],
                                            "Canswer":con3[j]._fields[2],
                                            "Bname":con3[j]._fields[3]
                                    }
                    
                    
                                    Results.push(object1)
                                }

                                
                               

                                
                                
                                

                               
                                for( i=0;i<=stuff.length-1;i++){
                                    
                                    for(j=0;j<=stuff[i][2].length-1;j++)
                                
                                     {
                                    let obj1 = {
                                        "Aname":stuff[i][0],
                                        "Aname1":stuff[i][0],
                                        "Aquestion":stuff[i][1],
                                        "Canswer":stuff[i][2][j],
                                        "Bname":''
                                    }

                                    
                                    Results.push(obj1)

                                    
                                }
                                }
                            
                            
                           

                            for(  j=0;j<=things.length-1;j++)
                            {
                                for(var l=0;l<=things[j][2].length-1;l++)
                                
                                {
                                    let obj1 = {
                                        "Aname":things[j][0],
                                        "Aname1":things[j][0],
                                        "Aquestion":things[j][1],
                                        "Canswer":things[j][2][l],
                                        "Bname":''
                                    }

                                    
                                    Results.push(obj1)
                                }
                               
                                
                            }
                            
                            
                           
                            var grouped = _.mapValues(_.groupBy(Results, 'Aname1'),
                            clist => clist.map(result=> _.omit(result, 'Aname1')));

                            

                            
                            for ( var result in grouped ){
                                Array4.push(grouped[result])
                            }
                                
                            setArray5(Array4)    
                            setAArray(Array4)
                            
                            

                         

                            axios.post('http://localhost:8088/ShowRelation4',{"Checklistid":ChecklistTitle}).then(function(response){
                                let Array7 = [] // A.name & A.question
                                let con4 = response.data.result.records
                                
                                for (var i=0;i<=con4.length-1;i++)
                                {
                                    Array7.push(con4[i]._fields)
                                }
                    
                                    setNameQt(Array7)
                                


                                   
                                    axios.post('http://localhost:8088/ShowChecklist',{"Checklistid":Number(ChecklistTitle)}).then(function(response){
                                        
                                    
                                        let Check = response.data.records[0]._fields[0].properties
                                        setChecklist(Check)
                                        
                                    
                                    })

                            })

                           
                        })
                        
                    })
                       
                       
                       })
                     
           })
                   
           
          
           setAnswers(list2)
           setAnswers2(list2)

           
           
                  
       })
    }
    useEffect(() => {
        addtwo();
       
       
    },[]);

    function ShowQuestion(){
        setInputList([{Answer:""}])
        setQuestion('')
        

    }

    function ShowResult(){

       setTitle('')
       setDescription('')
       setImagelink('')
       
    }
    function Checking(name){
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              
              console.log(name)
              console.log(AArray)
            let indexOfArrayItem =  NameQt.findIndex(i => i[1] === name); 
            let indexOfArrayItem2 = AArray.findIndex(i => i[0].Aname === name); 

            if (willDelete) {
           
               
                AArray.splice(indexOfArrayItem2, 1);
                
              swal("Successful Deletion!", {
                icon: "success",
                
              });
              addtwo()
           
         } else {
             
            }
          });
          
    }

    function DeleteQuestion (id){

        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              
            
            let apiUrl = 'http://localhost:8088/DeleteQuestion3/'; 
            let indexOfArrayItem = NameQt.findIndex(i => i[2].low === id);
            console.log(indexOfArrayItem)

            if (willDelete) {
            axios.post(apiUrl,{'id':id}).then((result) => {
                console.log(indexOfArrayItem)
                console.log(result)
                NameQt.splice(indexOfArrayItem, 1);
                
              swal("Successful Deletion!", {
                icon: "success",
                
              });
              addtwo()
            })
         } else {
              swal("Successful Cancel");
            }
          });
    }
    function Checking2(name){
        console.log("hey")
        let indexOfArrayItem =  Questions.findIndex(i => i.name === name);
        console.log()
        Questions.splice(indexOfArrayItem, 1);
        addtwo()
    }
    function changeoff(){
        setShow2(!show2)
        setShow(false)
    }
    function changeoff2(){
        setShow(!show)
        setShow2(false)
    }


    function confirmAll(){

        axios.post('http://localhost:8088/createQuestions',{"total":Questions}).then(function(response){

                axios.post('http://localhost:8088/createResults',{"total":Results}).then(function(response){
                  
                    axios.post('http://localhost:8088/UpdateRelation',{"total":total,"Checklistid":localStorage.getItem('id')}).then((result) => {

                        

                    })
                

                })
                history.push("/ShowAll");
            })

            }
  
   

    function Editcheck() {

        let Checklistid = localStorage.getItem('id')

        axios.post('http://localhost:8088/UpdateAll',{'check':Checklist,'id':Number(Checklistid)}).then(function(response){

            
        })
        }
    
  
    return (
        <div style={{background:'rgb(182 230 202)'}}>
            <Grid  component="main" >

            <Row  style={{fontFamily: 'Righteous',textAlign:'center',background: '#a4deb6',padding: '1em',margin:'0'}} >

            <Col md={3}><img src={Checklist.image} style={{width:'20em',height:'16em',webkitBoxShadow: '0 4px 60px rgb(0 0 0 / 50%)',float:'left'}} alt=''></img></Col>
                <Col md={9} style={{marginTop:'1em'}}>
                    <Col style={{display: 'inline-flex'}}>
                        <h6>Checklist</h6>
                    </Col>
                    <Col style={{display: 'inline-flex'}}>
                    {!verif1?<h2 style={{float: 'left',fontSize: '6em',color: '#232323'}}  onClick={verification}>{Checklist.title}</h2>
                    :<input type='text' style={{fontSize: '6em',border:'none',background:'transparent',outline:'none',color: '#232323',lineHeight: '1.2',padding:'0'}} name='text' defaultValue={Checklist.title} onChange={function(e){ let check = Checklist ; check.title = e.target.value ; setChecklist(check)}}/>}
                    </Col>
                    
                    <Col style={{display: 'inline-flex',marginBottom:'2em'}}>
                    {!verif2?<p style={{float: 'left',marginLeft:'3em',color: '#888282'}} onClick={verification2}>{Checklist.description}</p>
                    :<textarea name="w3review" type='text' style={{width:'29em',border:'none',background:'transparent',outline:'none',color: '#888282',lineHeight: '1.2',padding:'0',margin:'0',padding: '0em 3em'}} defaultValue={Checklist.description} onChange={function(e){ let check = Checklist ; check.description = e.target.value ; setChecklist(check)}}/>}  
                    </Col>
                    <Col style={{display: 'inline-flex'}}>
                    {!verif3?<h4 style={{marginRight:'2em'}} onClick={verification3} >{Checklist.visibility}</h4>
                    :<select  defaultValue={Checklist.visibility}  style={{background: '#64a969',marginRight: '1em',fontSize:'1em',borderRadius: '7px',border:'none',outline:'none',color:'rgb(35, 35, 35)'}} onChange={function(e){ let check = Checklist ; check.visibility = e.target.value ; setChecklist(check) }}>
                    <option selected="true" disabled="disabled"  >Visibility</option>
                    <option>Private</option>
                    <option>Public</option>
                    <option>Unfinished</option>
                    </select>
                    }
                   {!verif4? <h4 style={{marginRight:'2em'}} onClick={verification4} >{Checklist.type}</h4>
                   :<select  defaultValue={Checklist.type}  style={{background: '#64a969',marginRight: '1em',fontSize:'1em',borderRadius: '7px',border:'none',outline:'none',color:'rgb(35, 35, 35)'}} onChange={function(e){ let check = Checklist ; check.type = e.target.value ; setChecklist(check) ; console.log(check)}}>
                    <option selected="true" disabled="disabled"  >Visibility</option>
                    <option>General</option>
                    <option>General</option>
                    <option>Unfinished</option>
                    </select>
                     }
                    <h4 style={{marginRight:'2em'}}>20-11-2021</h4>
                    </Col>
                     
                    <Col md='auto' style={{display: 'inline-flex'}} > 
                    <Button variant="primary" type="submit"  style={{fontFamily: 'Righteous',padding: '0.2em 1.7em',fontSize: '1.4em',borderRadius: '1em',marginLeft: '1em',color: 'white',background: '#76a976' }} onClick={Editcheck}>Edit</Button>
                    <Button variant="primary" type="submit"  style={{fontFamily: 'Righteous',padding: '0.2em 1.7em',fontSize: '1.4em',borderRadius: '1em',marginLeft: '1em',background: '#bb5353',color: 'white'}} >Cancel</Button>
                    </Col>
                   
                </Col>
            </Row> 
            
            
            <Container style={{padding: '2em 15em',paddingBottom:'0em',borderRadius:'1em'}}>
            <Row className="justify-content-md-center" >
            <Button className={classes.button1} style={{marginTop:'0',fontFamily: 'Inter',padding: '1.5em 3em',borderRadius: '80%',fontSize: '1.5em',background: '#2EB837',textShadow: '2px 2px 2px black' }}>Edit Checklist</Button>
            </Row>
            </Container>

            <Container style={{backgroundColor:'azure',marginTop:'3em',padding: '2em 15em',paddingBottom:'0em',borderRadius:'1em'}}>
            
            <Row className="justify-content-md-center" >
            <Col md={4} style={{textAlign: 'end'}}><Button className={classes.button1} onClick={changeoff2}><FontAwesomeIcon icon={faPlus} style={{marginRight:'0.3em'}} className={classes.font1}/>Add Question</Button></Col>
            <Col md={4} style={{textAlign: 'start'}}><Button className={classes.button1} onClick={changeoff} ><FontAwesomeIcon icon={faPlus} style={{marginRight:'0.3em'}} className={classes.font1}/>Add Result</Button></Col>
            </Row>
            
            { show?
            <Row className="justify-content-md-center" style={{marginTop:'4em',paddingBottom:'2em'}}>    
            <Col md={10} ><input type="text" placeholder="Question Here..."  className={classes.input1} style={{width:'90%',height:'3.2em',marginLeft:'10%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter'}} value={Question} onChange={(e) =>setQuestion(e.target.value)}></input></Col>
            
            {inputList.map((item, i) => {
                return(<Col key={i} md={9} style={{paddingLeft: '5em', marginBottom:'1em'}}><input type="text" name="Answer" value={item.Answer} onChange={e => handleChange(e, i)} placeholder="Answer Here..." style={{width:'70%',height:'3.2em',marginLeft:'10%',background: 'rgb(235, 235, 235)',borderRadius: '0.4em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',color: 'grey'}}></input>
                {inputList.length - 1 === i && <img  src="plus.png" alt="" style={{width: '41px',marginBottom: '0.5em'}} className={classes.img1} onClick={handleAddInput}></img>}
                {inputList.length !== 1 && <img src="minus.png" alt="" style={{width: '38px',marginBottom: '0.5em'}} className={classes.img1} onClick={()=> handleRemoveInput(i)}/>}</Col>)
            })}
              
            </Row>
            :<div style={{padding:'1em'}}></div>
            }
            
            { show2?
                <Row className="justify-content-md-center">
                    <Col md={7} ><input type="text" placeholder="Title"  className={classes.titlere} style={{width:'90%',height:'3.2em',marginLeft:'10%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',background: 'rgb(235, 235, 235)',}} value={title} onChange={(e) =>setTitle(e.target.value)}></input></Col>
                    <Col md={7} ><textarea placeholder="Description..."  className={classes.description} style={{fontSize:'15px',width:'100%',height:'8em',marginLeft:'5%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',padding: '1em',fontFamily: 'Inter',background: 'rgb(235, 235, 235)',color: '#56564f'}} value={description} onChange={(e) =>setDescription(e.target.value)}></textarea></Col>
                    <Col md={7} style={{marginBottom:'26px',marginLeft: '10%',height: '50px'}}>
                    <div className="input-group" style={{marginBottom:'1.5em'}}>
                        <div className="custom-file" >
                            <input type="text" placeholder="Image link..."  className={classes.titlere} style={{width:'90%',height:'3.2em',borderRadius: '0.4em',border: '2em',outline: 'none',fontFamily: 'Inter',background: 'rgb(235, 235, 235)',paddingLeft:'1em'}} value={imagelink} onChange={(e) =>setImagelink(e.target.value)} ></input>
                           
                        </div>
                    </div>
                    </Col>
                </Row>
                :<div style={{padding:'1em'}}></div>
                }  
            { show2?<Row className="justify-content-md-center" style={{paddingBottom:'1em'}}>
                <Col md={12} style={{textAlign: 'center'}}><img src="yes.png" alt="" style={{width:'90px',cursor: 'pointer'}} onClick={AddResult} ></img>
                <img src="no.png" alt="" style={{width:'72px',marginTop: '0.2em',cursor: 'pointer'}} onClick={ShowResult}></img></Col>
            </Row>:<div style={{padding:'0em'}}></div>
            }
        { show?<Row className="justify-content-md-center" style={{paddingBottom:'1em'}}>
                <Col md={12} style={{textAlign: 'center'}}><img src="yes.png" alt="" style={{width:'90px',cursor: 'pointer'}} onClick={AddQuestion} ></img>
                <img src="no.png" alt="" style={{width:'72px',marginTop: '0.2em',cursor: 'pointer'}} onClick={ShowQuestion}></img></Col>
            </Row>:<div style={{padding:'0em'}}></div>
            }
            </Container>

           
            <Container style={{backgroundColor:'azure',marginTop:'3em',paddingBottom:'1em',borderRadius:'1em'}}>
            <Row>
                
                {Result.map((res, i) => {
                return(<Col md={4} key={i}><h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{res.name}</h2>
                    <div style={{background: "rgb(235, 235, 235)",fontFamily: "Inter",borderRadius: "0.5em",marginBottom:'1em'}}>
                        <Row>
                            <Col md={4}><img style={{width:"100px",borderRadius: "0.5em",heigh:"100px"}} src={res.image} alt=""></img></Col>  
                            <Col md={6}>
                                <h2 style={{margin: "auto",fontFamily: 'Inria Sans',fontSize: "1.5em",textAlign:'center',width: "max-content",marginTop: "0.3em"}}>{res.title}</h2> 
                                <p style={{marginTop: "0.7em",fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{res.description}</p>
                            </Col>   
                        </Row>                
                    </div>
                    </Col>
                )
            })}
             {Results.map((result, i) => {
                return(<Col md={4} key={i}><h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{result.name}</h2>
                    <div style={{background: "rgb(235, 235, 235)",fontFamily: "Inter",borderRadius: "0.5em",marginBottom:'1em'}}>
                        <Row>
                            <Col md={4}><img style={{width:"100px",borderRadius: "0.5em",heigh:"100px"}} src={result.image} alt=""></img></Col>  
                            <Col md={6}>
                                <h2 style={{margin: "auto",fontFamily: 'Inria Sans',fontSize: "1.5em",textAlign:'center',width: "max-content",marginTop: "0.3em"}}>{result.title}</h2> 
                                <p style={{marginTop: "0.7em",fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{result.description}</p>
                            </Col>   
                        </Row>                
                    </div>
                    </Col>
                )
            })}
            </Row>
            </Container>  


            <div style={{maxWidth: '75%',marginLeft: '12%', backgroundColor:'azure',marginTop:'3em',padding: '2em 5em',paddingBottom:'0em',borderRadius:'1em'}}>            
           
            <Row>
            {NameQt.map((NameQts, i) => {
            return(<Col md={6} Key={i}> <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{NameQts[1]}</h2> 
            <div><FontAwesomeIcon icon={faTrash} style={{marginRight:'0.3em',fontSize: '2.5em', position: 'absolute',top:'1.2em',cursor: 'pointer'}} className={classes.font1} onClick={e => DeleteQuestion(NameQts[2].low)}/>
            <input type="text" value={NameQts[0]} readonly="readonly" className={classes.input1} style={{width:'90%',height:'3.2em',marginLeft:'10%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',maxWidth: '80%'}}></input>
            </div>
            {AArray[i].map((AArrays, index) => 
            {
              
            return(<Row><Col md={9}><input type="text" Key={index} className={classes.input1} value={AArrays.Canswer} readonly="readonly" style={{width:'80%',height:'3.2em',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',marginLeft:'20%'}}></input></Col>
                 <Col md={3}><Form.Control as="select"  onChange={e => addrel(e,index,AArrays.Canswer,NameQts[1],AArrays.Bname)}  style={{background: 'rgb(235, 235, 235)',fontFamily: 'Inter',maxWidth: '4.6em',marginTop: '0.23em',height: '2.9em',outline: 'none' ,marginLeft: '-1.1em'}} defaultValue={AArrays.Bname} > <option></option> {Names.map((name, i) => {return NameQts[1]!==name? <option Key={i} >{name}</option>: null})}</Form.Control> </Col></Row>
             )})}

            </Col>)
             })}          
             </Row>

             <Row>
            {Questions.map((Question, i) => {
            return(<Col md={6} Key={i}> <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{Question.name}</h2> 
            <div><FontAwesomeIcon icon={faTrash} style={{marginRight:'0.3em',fontSize: '2.5em', position: 'absolute',top:'1.2em',cursor: 'pointer'}} className={classes.font1} onClick={e => Checking2(Question.name)}/>
            <input type="text" value={Question.question} readonly="readonly" className={classes.input1} style={{width:'90%',height:'3.2em',marginLeft:'10%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',maxWidth: '80%'}}></input>
            </div> {Question.answer.map((Quest, index) => 
            {
              
            return(<Row><Col md={9}><input type="text" Key={index} className={classes.input1} value={Quest} readonly="readonly" style={{width:'80%',height:'3.2em',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',marginLeft:'20%'}}></input></Col>
                <Col md={3}><Form.Control as="select"   onChange={e => addrel(e,index,Quest,Question.name)}  style={{background: 'rgb(235, 235, 235)',fontFamily: 'Inter',maxWidth: '4.6em',marginTop: '0.23em',height: '2.9em',outline: 'none' ,marginLeft: '-1.1em'}} > <option></option> {Names.map((name, i) => {return Question.name!==name? <option Key={i} >{name}</option>: null})}</Form.Control> </Col></Row>
             )})}
            
            </Col>)
             })}          
             </Row>
            
           
            
            
             <Row className="justify-content-md-center" ><Col md={6}> <Button variant="primary" type="submit"  style={{marginBottom:'2em'}} className={classes.button2} onClick={confirmAll}>Save</Button></Col></Row>
            </div>
            </Grid>
        </div>
    )
}
