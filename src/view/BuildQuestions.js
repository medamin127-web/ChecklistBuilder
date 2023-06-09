import React,{useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Form from 'react-bootstrap/Form'
import Button from "@material-ui/core/Button"
import Container from 'react-bootstrap/Container'
import { faPlus , faTrash,faCheck} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@material-ui/core';
import { CustomInput } from 'reactstrap';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';



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
        
    }

}))


export default function BuildQuestions() {

    //Modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
      }
    
      function closeModal() {
        setIsOpen(false);
      }



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
    const [nonrelation,setNonRelation] = useState([])
    const[Answers2,setAnswers2] = useState([])
    const [Result,setResult] = useState([])
    const [Verif,setVerif] = useState(true)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagelink, setImagelink] = useState('');
    const [Names,setNames] = useState([]);
    const [totalRel,setTotalRel] = useState([]);
    const [RelArray,setRelArray]= useState([]);
    const [visibility,setVisibility] = useState();

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        
        const list = [...inputList]; 
        list[index][name]=value;

        setInputList(list);
    }

  

    function addrel (e,index,answer,name)
    {
        let tot = total
        let list2 = [];

        list2.push(e.target.value)
       setChoice(list2[0]);
        
       
        let rel = {
            name1:name,
            name2:list2[0],
            answer:answer[index]
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
            console.log(total)
        }
        

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
        let Checklistid = localStorage.getItem('id')
        axios.post('http://localhost:8088/ShowQuestions',{"Checklistid":Checklistid})
        .then(function (response) {    
           console.log('sucess')
           console.log(response.data.records)
           setNom(response.data.records.length + 1)
           axios.post('http://localhost:8088/createQuestion',{
            "question": Question,
            "answer": A1,
            "name": "Q" +  (Number(response.data.records.length ) + 1),
            "num": response.data.records.length+1,
            "Checklistid":localStorage.getItem('id'),
    })
    .then(function (response) {    
      
       console.log('success')
       setInputList([{Answer:""}])
       setQuestion('')
       setShow(!show)
       addtwo()
      })
      .catch(function (error) {
        
        console.log(error);                   
        
      });
          })
          .catch(function (error) {
            
            console.log(error);                   
            
          });
          
       
    }

    function AddResult(){
        let Checklistid= localStorage.getItem('id')
      axios.post('http://localhost:8088/ShowResults',{"Checklistid":Checklistid})
        .then(function (response) {    
           console.log('sucess')
           console.log(response.data.records)
           setNom(response.data.records.length + 1)
           axios.post('http://localhost:8088/createResult',{
            "title": title,
            "description": description,
            "image": imagelink,
            "num": response.data.records.length+1,
            "name": "R" +  (Number(response.data.records.length ) + 1),
            "Checklistid":localStorage.getItem('id'),
    })
    .then(function (response) {    
       
       console.log(title) 
       console.log('success')
       setTitle('')
       setDescription('')
       setImagelink('')
       setShow2(!show2)
       addtwo()
      })
      .catch(function (error) {
        
        console.log(error);                   
        
      });
          })
          .catch(function (error) {
            
            console.log(error);                   
            
          });
            
    
    }

 
 function addtwo(){
     let apiURL = "http://localhost:8088/Showme"
     
     let Checklistid= localStorage.getItem('id')
    axios.post('http://localhost:8088/ShowQuestions',{"Checklistid":Checklistid})
    .then(function (response) {    

        let cont = response.data.records
        
        let list2 = [];
        let list1 = [];
        let list3 = [];
      
      
        console.log(cont)
        for (var i=0; i<=cont.length-1;i++){
            
            let obj = {
                    'name':cont[i]._fields[0].properties.name,
                    'question':cont[i]._fields[0].properties.question,
                    'Checklistid':cont[i]._fields[0].properties.Checklistid,
                    'answer':cont[i]._fields[0].properties.answer,
                    'num':cont[i]._fields[0].properties.num,
                    'id':cont[i]._fields[0].identity.low
            }
            list2.push(obj)
            
        }
        
     
        
        axios.post('http://localhost:8088/ShowResults',{"Checklistid":Checklistid}).then(function (response){
            
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
        })
        axios.get(apiURL)
        .then(function(response) {
            
            let cont = response.data.records
            
            let names = [];
            for (var j=0;j<=cont.length-1;j++){
                names.push(cont[j]._fields[0].properties.name)
            }

            let exist = false
            
            for (var m=0;m<=names.length-1;m++){
                
                for(var n=0;n<=list2.length-1;n++){
                    
                    if(names[m] === list2[n].name){ 
                        list2[n].visibile = "visible"
                        
                    }
                }
            }
            
            
           


            

        })
        setAnswers(list2)
        setAnswers2(list2)
        console.log(list2)
               
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
    function Checking(id){
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              
            
          
            let indexOfArrayItem = Answers.findIndex(i => i.id === id);
            console.log(indexOfArrayItem)
            if (willDelete) {
            axios.post("http://localhost:8088/DeleteQuestion",{'id':id}).then((result) => {
                 Answers.splice(indexOfArrayItem, 1);
                
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
    function changeoff(){
        setShow2(!show2)
        setShow(false)
    }
    function changeoff2(){
        setShow(!show)
        setShow2(false)
    }


    function confirmAll(){

      
                
                axios.post('http://localhost:8088/UpdateVisibility',{"title":Number(localStorage.getItem('id')),"visibility":visibility}).then((result) => {
                    axios.post('http://localhost:8088/AddRelation2',{"total":total,"Checklistid":localStorage.getItem('id')}).then((result) => {

                    
                })
                
                history.push("/ShowAll");
                
            }).catch(function (error) {
    
                console.log(error);                   
                
              });


              
        
    }

  
    function DeleteQuestion(){

    }

    function DeleteChecklist(){
       
        let  Checklistid = localStorage.getItem('id')
        axios.post('http://localhost:8088/DeleteChecklist',{"Checklistid":Checklistid}).then((result) => {
        
        history.push("/Step1");


    } 
        )
    }
    
  
    return (
        <div style={{background:'rgb(182 230 202)'}}>
            <Grid  component="main" >
            <h2 style={{fontFamily: 'Righteous',textAlign:'center',color: '#AAAAAA',marginTop: '1em',background: 'aliceblue',padding: '1em'}}>Step 2 : Build The Questions</h2>
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
            <Row  >
                
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
            </Row>
            </Container>  


            <div style={{maxWidth: '75%',marginLeft: '12%', backgroundColor:'azure',marginTop:'3em',padding: '2em 5em',paddingBottom:'0em',borderRadius:'1em'}}>            
            <Row>
            {Answers2.map((answer, i) => {
            return(<Col md={6} Key={i}> <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>{answer.name}</h2> 
            <div><FontAwesomeIcon icon={faTrash} style={{marginRight:'0.3em',fontSize: '2.5em', position: 'absolute',top:'1.2em',cursor: 'pointer'}} className={classes.font1} onClick={e => Checking(answer.id)}/>
            <input type="text" value={answer.question} readonly="readonly" className={classes.input1} style={{width:'90%',height:'3.2em',marginLeft:'10%',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',maxWidth: '80%'}}></input>
            </div> {answer.answer.map((answer2, index) => {
            return(<Row><Col md={9}><input type="text" Key={index} className={classes.input1} value={answer2} readonly="readonly" style={{width:'80%',height:'3.2em',borderRadius: '0.4em',marginBottom:'1.5em',border: '2em',outline: 'none',paddingLeft: '1.2em',fontFamily: 'Inter',marginLeft:'20%'}}></input></Col>
                <Col md={3}><Form.Control as="select"  onChange={e => addrel(e,index,answer.answer,answer.name)}  style={{background: 'rgb(235, 235, 235)',fontFamily: 'Inter',maxWidth: '4.6em',marginTop: '0.23em',height: '2.9em',outline: 'none' ,marginLeft: '-1.1em'}} > <option></option> {Names.map((name, i) => {return answer.name!==name? <option Key={i} >{name}</option>: null})}</Form.Control> </Col></Row>
             )})}
            
            </Col>)
             })}          
             </Row>
             <Row className="justify-content-md-center" ><Col md={6}> <Button variant="primary" type="submit"  style={{marginBottom:'2em'}} className={classes.button2} onClick={openModal} >Save</Button></Col></Row>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
        <Container style={{backgroundColor:'white',padding: '4em 5em',paddingBottom:'0em',maxWidth: 'max-content'}}>
        <h2 style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA'}}>Step 3 : Confirm</h2>
        <Row className="justify-content-md-center" style={{marginTop:'1.5em'}}>
                        <Col md={6} >
                            <Form.Control as="select"   value={visibility} onChange={(e) =>setVisibility(e.target.value)} style={{width:'8em',backgroundColor:"rgb(235, 235, 235)",borderRadius: '7px', fontFamily: 'Carter One',fontSize: '1em',height: '2.7em'}}>
                            <option selected="true" disabled="disabled"  >Visibility</option>
                            <option>Private</option>
                            <option>Public</option>
                            <option>Unfinished</option>
                            </Form.Control>
                        </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginRight: "1em"}}>
                <Col md={3}><Button className={classes.button2} style={{border:"0",background:"#d85252",fontFamily: 'Righteous',padding: '1em 1em',fontSize: '1.2em'}} onClick={closeModal}>Close</Button></Col>
                <Col md={8} ><Button variant="primary" type="submit"  style={{border:"0",background:"rgb(58 183 90)",fontFamily:"Carter One",padding: "1em 1em",fontSize: '1.2em'}} className={classes.button2} onClick={confirmAll} >Confirm</Button></Col>
            </Row>
           
            <p style={{fontFamily: 'Inria Sans',textAlign:'center',color: '#AAAAAA',marginTop: "3em"}}>Do you want to delete the checklist?</p>
            <FontAwesomeIcon icon={faTrash} style={{fontSize: '2.5em',cursor: 'pointer',marginLeft: "45%"}} className={classes.font1}  onClick={DeleteChecklist} />    
        </Container>
        
      </Modal>
            </div>
            </Grid>
        </div>
    )
}
