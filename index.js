const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const neo4j = require('neo4j-driver')


mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://MAH:MAH1997@cluster0.yukgo.mongodb.net/ChecklistBuilder?authSource=admin&replicaSet=myRepl&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");

    })
    .catch(err => {
        console.error("Connection error", err);

    });

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic('neo4j', 'checklists'))
const session = driver.session()

   
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan

// simple route
app.get("/", (req, res) => {
    console.log("Hello MERN Soldier");
});

app.use('/images', express.static('uploads'));

app.post("/createChecklist",(req,res) => {

    var title = req.body.title;
    var type = req.body.type;
    var description = req.body.description;
    var image = req.body.image;
    
   

     session.run ('CREATE(n:Checklist {title:$titleParam,type:$typeParam,description:$descriptionParam,image:$imageParam}) RETURN n',{titleParam:title,typeParam:type,descriptionParam:description,imageParam:image})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})


app.post("/createQuestion",(req,res) => {

    var question = req.body.question;
    var answer = req.body.answer;
    var name = req.body.name;
    var num = req.body.num;
    var Checklistid = req.body.Checklistid
   

     session.run ('CREATE(n:Question {question:$questionParam,answer:$answerParam,name:$nameParam,num:$numParam,Checklistid:$Checklistid}) RETURN n',{questionParam:question,answerParam:answer,nameParam:name,numParam:num,Checklistid:Checklistid})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})


app.post("/createQuestions",(req,res) => {

    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var num = req.body.num;
    var name = req.body.name;
    var total = req.body.total

     session.run ('UNWIND $totalParam AS tablerel CREATE(n:Question {question:tablerel.question,answer:tablerel.answer,name:tablerel.name,num:tablerel.num,Checklistid:tablerel.Checklistid}) RETURN n ',{totalParam:total})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/createResult",(req,res) => {

    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var num = req.body.num;
    var name = req.body.name;
    var Checklistid = req.body.Checklistid
   

     session.run ('CREATE(n:Result {title:$titleParam,description:$descriptionParam,image:$imageParam,num:$numParam,Checklistid:$Checklistid,name:$nameParam}) RETURN n',{nameParam:name,titleParam:title,descriptionParam:description,imageParam:image,numParam:num,Checklistid:Checklistid})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/createHistory",(req,res) => {

    var Username = req.body.Username;
    var Age = req.body.Age;
    var gender = req.body.gender;
    var state = req.body.state;
    var city = req.body.city;
    var ResultTitle = req.body.ResultTitle
    var ResultId = req.body.ResultId
    var ChecklistName = req.body.ChecklistName 
    var date = req.body.date  
    var Doctorname = req.body.Doctorname

     session.run ('CREATE(n:History {Username:$Username,Age:$Age,gender:$gender,state:$state,city:$city,ResultTitle:$ResultTitle,ChecklistName:$ChecklistName,Date:$Date,ResultId:$ResultId,Doctorname:$Doctorname}) RETURN n',{Username:Username,Age:Age,gender:gender,state:state,city:city,ResultTitle:ResultTitle,ChecklistName:ChecklistName,Date:date,ResultId:ResultId,Doctorname:Doctorname})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})
app.post("/createResults",(req,res) => {

    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var num = req.body.num;
    var name = req.body.name;
    var total = req.body.total

     session.run ('UNWIND $totalParam AS tablerel CREATE(n:Result {title:tablerel.title,description:tablerel.description,image:tablerel.image,num:tablerel.num,name:tablerel.name,Checklistid:tablerel.Checklistid}) RETURN n ',{totalParam:total})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})



app.post("/createChecklist",(req,res) => {

    var title = req.body.title;
    var type = req.body.type;
    var description = req.body.description;
    var image = req.body.image;
    var DateCreated = req.body.DateCreated;
    var doctorname = req.body.doctorname
   

     session.run ('CREATE(n:Checklist {title:$titleParam,type:$typeParam,description:$descriptionParam,image:$imageParam,DateCreated:$DateCreatedParam,Doctorname:$doctornameParam}) RETURN id(n)',{titleParam:title,typeParam:type,descriptionParam:description,imageParam:image,DateCreatedParam:DateCreated,doctornameParam:doctorname})
            .then(function(result){
                console.log("it works")
                console.log(result)
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
}) 

app.post("/createChecklist2",(req,res) => {

    var title = req.body.title;
    var type = req.body.type;
    var description = req.body.description;
    var image = req.body.image;
    var DateCreated = req.body.DateCreated;
    var doctorname = req.body.doctorname
    var views = req.body.views
   
     session.run ('CREATE(n:Checklist {title:$titleParam,type:$typeParam,description:$descriptionParam,image:$imageParam,DateCreated:$DateCreatedParam,Doctorname:$doctornameParam,views:$viewsParam}) RETURN {id:id(n),name:n.title}',{titleParam:title,typeParam:type,descriptionParam:description,imageParam:image,DateCreatedParam:DateCreated,doctornameParam:doctorname,viewsParam:views})

            .then(function(result){
                console.log("it works")
                console.log(result)
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
}) 

app.post("/DeleteQuestion",(req,res) => {

    var id = req.body.id 
    session.run('MATCH (n:Question ) WHERE id(n) = $id DELETE n ' ,{id:id})
    .then(function(result){
        console.log("it works")
        res.status(201).json({result});
        
    }).catch(function(err){
        console.log(err)
    });

})

app.delete("/DeleteQuestion2/:name",(req,res) => {

    var Checklistid = req.body.Checklistid;
    
    session.run('MATCH (n:Question {name: $name}) DETACH DELETE n ' ,{name:req.params.name,})
    .then(function(result){
        console.log("it works")
        res.status(201).json({result});
        
    }).catch(function(err){
        console.log(err)
    });

})

app.post("/DeleteQuestion3/",(req,res) => {

    var id = req.body.id;
    
    session.run('MATCH (n:Question) WHERE id(n) = $id DETACH DELETE n ' ,{id:id})
    .then(function(result){
        console.log("it works")
        res.status(201).json({result});
        
    }).catch(function(err){
        console.log(err)
    });

})

app.post("/DeleteAchecklist",(req,res) => {


    var id = req.body.id

    session.run('MATCH (n:Checklist) WHERE id(n) = $id DELETE n ' ,{id:id})
    .then(function(result){
        console.log("it works")
        res.status(201).json({result});
        
    }).catch(function(err){
        console.log(err)
    });

})

app.post("/AddRelation",(req,res) => {

    var name1 = req.body.name1
    var name2 = req.body.name2;
    var answer = req.body.answer;
    var Checklistid = req.body.Checklistid;

    session.run('MATCH(n:Question {name:$name1Param,Checklistid:$Checklistid}),(m:Question {name:$name2Param}) MERGE (n)-[r:FOLLWED {answer:$answerParam}]->(m {Checklistid:$Checklistid}) RETURN n,m',{Checklistid:Checklistid,name1Param:name1,name2Param:name2,answerParam:answer} )
            .then(function(result){
                console.log("sucess")
               
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/AddRelation2",(req,res) => {

    var name1 = req.body.name1
    var name2 = req.body.name2;
    var answer = req.body.answer;
    var total = req.body.total;
    var Checklistid = req.body.Checklistid;

    session.run('UNWIND $totalParam AS tablerel MATCH(n {name:tablerel.name1,Checklistid:$Checklistid}),(m {name:tablerel.name2,Checklistid:$Checklistid}) MERGE (n)-[r:FOLLWED {answer:tablerel.answer}]->(m) RETURN n,m ',{totalParam:total,Checklistid:Checklistid})
            .then(function(result){
                console.log("sucess")
               
            })
            .catch(function(err){
                console.log(err)
            });
       
})



app.post("/AddRelation3",(req,res) => {

  
    var tags = req.body.tags;
    var Checklistid = req.body.Checklistid;

    session.run('UNWIND $tagsParam AS tagsRel MATCH(n:Checklist),(m {name:tagsRel}) WHERE id(n) = $Checklistid MERGE (n)-[r:Have]->(m) RETURN n,m ',{tagsParam:tags,Checklistid:Checklistid})
            .then(function(result){
                console.log("sucess")
               
            })
            .catch(function(err){
                console.log(err)
            });
       
})


app.post("/UpdateRelation",(req,res) => {

    var delname = req.body.delname
    var name2 = req.body.name2;
    var answer = req.body.answer;
    var total = req.body.total;
    var Checklistid = req.body.Checklistid;

    session.run('UNWIND $totalParam AS tablerel MATCH(n {name: tablerel.name1,Checklistid:$Checklistid}),(m {name:tablerel.name2,Checklistid:$Checklistid}) MERGE (n)-[r1:FOLLWED {answer:tablerel.answer}]->(m) with tablerel OPTIONAL MATCH (n)-[r2 {answer:tablerel.answer} ]->(l {name:tablerel.nameprev, Checklistid:$Checklistid}) DELETE r2 ',{totalParam:total,Checklistid:Checklistid})
            .then(function(result){
                console.log("sucess")
               
            })
            .catch(function(err){
                console.log(err)
            });
       
})



app.get("/Showme",(req,res) => {
    session.run('MATCH (n)WHERE NOT (n)--()RETURN n;' )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties.name)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})
app.post("/showfirst",(req,res) => {

    var Checklistid = req.body.Checklistid

    session.run('MATCH (n:Question)WHERE n.Checklistid = $Checklistid AND NOT (n)<--()RETURN n;',{Checklistid:Checklistid})
    .then(function(result){
        
       res.json(result)
   })
   .catch(function(err){
       console.log(err)
   });

})
app.post("/showrest",(req,res) =>{

    var Checklistid = req.body.Checklistid
    session.run('MATCH (n) WHERE n.Checklistid = $Checklistid AND (n)<--()RETURN n;',{Checklistid:Checklistid})
    .then(function(result){
        
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
 
 })

 
app.post("/ShowQuestions",(req,res) => {

    var Checklistid = req.body.Checklistid

    session.run('Match (n:Question) WHERE n.Checklistid = $Checklistid RETURN n,id(n) ORDER BY n.num' , {Checklistid : Checklistid})
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/ShowResults",(req,res) => {
    var Checklistid = req.body.Checklistid

    session.run('MATCH(n:Result) WHERE n.Checklistid = $Checklistid RETURN n ' , {Checklistid:Checklistid} )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/ShowResult",(req,res) => {
    var Checklistid = req.body.Checklistid
    var Resultid = req.body.Resultid


    session.run('MATCH(n:Result) WHERE n.Checklistid = $Checklistid  AND id(n) = $Resultid RETURN n ' , {Checklistid:Checklistid,Resultid:Resultid} )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/ShowChecklist",(req,res) => {

    var Checklistid = req.body.Checklistid

    session.run('MATCH(n:Checklist) WHERE id(n) = $Checklistid RETURN n' , {Checklistid:Checklistid} )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})


app.post("/UpdateVisibility",(req,res) => {

    var title = req.body.title
    var visibility = req.body.visibility


    session.run('MATCH(n:Checklist) WHERE id(n) =  $title SET n.visibility = $visibilityParam RETURN n.title, n.visibility' , {title:title,visibilityParam:visibility} )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/UpdateViews",(req,res) => {

    var id = req.body.id
    var views = req.body.views


    session.run('MATCH(n:Checklist) WHERE id(n) =  $id SET n.views= $viewsParam RETURN n' , {id:id,viewsParam:views})
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/UpdateAll",(req,res) => {

    var id = req.body.id
    var check = req.body.check
    


    session.run('MATCH(n:Checklist ) WHERE id(n) = $id SET n = $check RETURN n ' , {check:check,id:id} )
    .then(function(result){
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/DeleteChecklist",(req,res) => {

    var Checklistid = req.body.Checklistid

    session.run('MATCH (n) WHERE n.Checklistid=$Checklistid OR id(n)=$Checklistid DELETE n ' , {Checklistid:Checklistid} )
    .then(function(result){
         result.records.forEach(function(record){
            console.log(record._fields[0].properties)
        });
        res.json(result)
    })
    .catch(function(err){
        console.log(err)
    });
})

app.get("/ShowRelation",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
   

        

    session.run('MATCH (A )-[C]->(B) RETURN A.name,C.answer,B.name,B.question ORDER BY A.name' )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });
})

app.get("/ShowRelation2",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
    

        

    session.run('MATCH (A:Question)<-[C]-(B) RETURN A.question,C.answer,B.name ORDER BY A.name' )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/ShowRelation3",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
    
    var Checklistid = req.body.Checklistid
        

    session.run('MATCH (A )-[C]->(B) WHERE A.Checklistid=$Checklistid RETURN A.name,A.question,C.answer,B.name ORDER BY A.name', {Checklistid:Checklistid} )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });
})




app.post("/ShowRelation4",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
   
    var Checklistid = req.body.Checklistid
        

    session.run('MATCH (A:Question) WHERE A.Checklistid=$Checklistid RETURN A.question,A.name,id(A) ORDER BY A.name ',{Checklistid:Checklistid} )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });

            
})

app.post("/ShowRelation5",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
   
    var Checklistid = req.body.Checklistid
        
    
    session.run('MATCH (A:Question)WHERE A.Checklistid=$Checklistid AND NOT (A)-[]-() RETURN A.name,A.question,A.answer ORDER BY A.name ;',{Checklistid:Checklistid} )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });

            
})

app.post("/ShowRelation6",(req,res) => {

    //var ChecklistTitle = req.body.ChecklistTitle
   
    var Checklistid = req.body.Checklistid
        
    
    session.run('MATCH (A:Question)-[]-() WHERE A.Checklistid=$Checklistid  AND (A)<-[]-() AND NOT (A)-[]->() RETURN A.name,A.question,A.answer ORDER BY A.name ;',{Checklistid:Checklistid} )
            .then(function(result){
                console.log("sucess")
                res.status(201).json({result});
            })
            .catch(function(err){
                console.log(err)
            });

            
})


app.post("/ShowChecklists",(req,res) =>{

    var Doctorname = req.body.Doctorname

    session.run('MATCH (A:Checklist ) WHERE A.Doctorname = $Doctorname RETURN A',{Doctorname:Doctorname}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})



app.get("/ShowPublicChecklists",(req,res) =>{

    session.run('MATCH (A:Checklist) WHERE A.visibility = "Public" RETURN A').then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})


app.post("/showDoctorChecklists",(req,res) =>{

    var name = req.body.name

    session.run('MATCH (A:Checklist) WHERE A.visibility = "Public" AND A.Doctorname = $name RETURN A',{name:name}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})


app.get("/ShowTags",(req,res) =>{

    session.run('MATCH (A:Tag) RETURN A').then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})

app.post("/CreateTag",(req,res) =>{

    var name = req.body.name

    session.run('MERGE (n:Tag{name:$name})', {name:name}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
})


app.post("/CreateTags",(req,res) => {

  
    var tag = req.body.tag

     session.run ('UNWIND $tagParam AS tagrel MERGE (n:Tag{name:tagrel})  ',{tagParam:tag})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/MatchByTag",(req,res) => {

    
    var tag = req.body.tag

     session.run ('MATCH (A:Checklist )-[]->(L:Tag) WHERE L.name=$tagParam AND A.visibility = "Public" RETURN A  ',{tagParam:tag})
            .then(function(result){
               
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})

app.get("/CountViews",(req,res) => {


     session.run ('MATCH (n:Tag) WHERE (n)<-[]-(:Checklist {visibility:"Public"}) RETURN size((n)<--()) AS count,n.name')
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
})

app.post("/filtering1",(req,res) =>{
    
   
    var filtrer = req.body.filtrer

    session.run('MATCH (A:Checklist {type:$filtrer.type,visibility:$filtrer.visibility })  RETURN A', {filtrer:filtrer}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/filtering2",(req,res) =>{
    
    
    var type = req.body.type
  

    session.run('MATCH (A:Checklist {type:$type})  RETURN A', {type:type}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})
app.post("/filtering3",(req,res) =>{
    
    var visibility = req.body.visibility

  

    session.run('MATCH (A:Checklist {visibility:$visibility})  RETURN A', {visibility:visibility}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findchecklist",(req,res) =>{
    
    var title = req.body.title

    session.run('MATCH (A:Checklist)  WHERE A.visibility = "Public" AND A.title = $title RETURN A', {title:title}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findchecklist2",(req,res) =>{
    
    var title = req.body.title

    session.run('MATCH (A:Checklist)  WHERE A.title = $title RETURN A', {title:title}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findtag",(req,res) =>{
    
    var title = req.body.title

    session.run('MATCH (A:Checklist {visibility:"Public"})-[:Have]-(C:Tag) WHERE C.name = $title RETURN A', {title:title}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})


app.post("/findtag2",(req,res) =>{
    
    var title = req.body.title

    session.run('MATCH (A:Checklist)-[:Have]-(C:Tag) WHERE C.name = $title RETURN A', {title:title}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findtags",(req,res) =>{
    
    var id = req.body.id

    session.run('MATCH (A:Checklist)-[:Have]->(T:Tag) WHERE id(A) = $id return T.name', {id:id}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findtags2",(req,res) =>{
    
    var checklists = req.body.checklists

    session.run('UNWIND $checksParam AS check MATCH (A:Checklist)-[:Have]->(T:Tag) WHERE id(A) = check.id return T.name,check.id', {checksParam:checklists}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/findSuggestion",(req,res) =>{
    
    var tags = req.body.tags
    var id = req.body.id

    session.run('UNWIND $tagParam AS tagrel MATCH (A:Checklist)-[:Have]->(T:Tag {name:tagrel}) WHERE NOT id(A) = $idParam return A', {idParam:id,tagParam:tags}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

app.post("/FirstQuestion",(req,res) =>{
    
    var Checklistid= req.body.Checklistid

    session.run('MATCH (n) WHERE n.Checklistid = $idParam RETURN n LIMIT 1 ', {idParam:Checklistid}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });

})

app.post("/NextQuestion",(req,res) =>{
    
    var Checklistid = req.body.Checklistid
    var answer = req.body.answer
    var Questionid = req.body.Questionid

    session.run('Match (n {Checklistid: $idParam})-[:FOLLWED {answer:$answerParam}]->(m {Checklistid: $idParam}) WHERE id(n) = $Questionid  RETURN m', {idParam:Checklistid,answerParam:answer,Questionid:Questionid }).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });

})

app.post("/PreviousQuestion",(req,res) =>{
    
    var Checklistid = req.body.Checklistid
     var id = req.body.id

    session.run('MATCH (m:Question {Checklistid:$Checklistid})-[:FOLLWED]->(n:Question {Checklistid:$Checklistid}) WHERE id(n) = $id RETURN m', {Checklistid:Checklistid,id:id}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });

})

app.post("/SearchResult",(req,res) =>{
    
  
    var Checklistid = req.body.Checklistid
    var answer = req.body.answer
    var Questionid = req.body.Questionid


    session.run('MATCH (m {Checklistid: $idParam})-[:FOLLWED {answer:$answer}]->(n) WHERE LABELS(n) = ["Result"] AND id(m) = $Questionid  RETURN n ' , {idParam:Checklistid,answer:answer,Questionid:Questionid}).then(function(result){
        console.log("sucess")
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });

})



app.post("/showhistory",(req,res) =>{
    
    let doctname= req.body.doctname

    session.run('MATCH (n:History ) WHERE n.Doctorname = $doctname RETURN n ' , {doctname:doctname}).then(function(result){
        
        res.status(201).json({result});
    })
    .catch(function(err){
        console.log(err)
    });
    
})

const userRoutes = require("./App/Route/route");
app.use("/user", userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});