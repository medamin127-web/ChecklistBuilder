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
    var ChecklistTitle = req.body.ChecklistTitle
   

     session.run ('CREATE(n:Question {question:$questionParam,answer:$answerParam,name:$nameParam,num:$numParam,ChecklistTitle:$ChecklistTitleParam}) RETURN n',{questionParam:question,answerParam:answer,nameParam:name,numParam:num,ChecklistTitleParam:ChecklistTitle})
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
    var ChecklistTitle = req.body.ChecklistTitle
   

     session.run ('CREATE(n:Result {title:$titleParam,description:$descriptionParam,image:$imageParam,num:$numParam,ChecklistTitle:$ChecklistTitleParam,name:$nameParam}) RETURN n',{nameParam:name,titleParam:title,descriptionParam:description,imageParam:image,numParam:num,ChecklistTitleParam:ChecklistTitle})
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
    
   

     session.run ('CREATE(n:Checklist {title:$titleParam,type:$typeParam,description:$descriptionParam,image:$imageParam}) RETURN n',{titleParam:title,typeParam:type,descriptionParam:description,imageParam:image})
            .then(function(result){
                console.log("it works")
                res.status(201).json({result});
                
            })
            .catch(function(err){
                console.log(err)
            });
}) 


app.delete("/DeleteQuestion/:name",(req,res) => {

   

    session.run('MATCH (n:Question {name: $name}) DELETE n ' ,{name:req.params.name})
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

    session.run('MATCH(n:Question {name:$name1Param}),(m:Question {name:$name2Param}) MERGE (n)-[r:FOLLWED {answer:$answerParam}]->(m) RETURN n,m',{name1Param:name1,name2Param:name2,answerParam:answer} )
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
app.get("/ShowQuestions",(req,res) => {
    session.run('MATCH(n:Question) RETURN n ORDER BY n.num' )
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

app.get("/ShowResults",(req,res) => {
    session.run('MATCH(n:Result) RETURN n ORDER BY n.num' )
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
    var name = req.body.name

    session.run('MATCH (A )-[C]->(B) RETURN A.name,C.answer,B.name,B.question' )
            .then(function(result){
                console.log("sucess")
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