const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../Model/User");

const userController = require("../controller/userController");

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


router.post("/register", async(req, res) => {

    

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            Email: req.body.email,
            password: req.body.password,
            Country: req.body.country,
            Speciality: req.body.Speciality,
            image: req.body.image
        });
        let data = await user.save();
        const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
        res.status(201).json({ data, token });
   
});

router.post("/Password",async(req,res)=> {

            //const user =  await User.findByCredentials(email,password);
            //const user = await User.findByCredentials(req.body.email,req.body.password);
            const email = req.body.email
            const user = await User.findOne( {Email:email} );
            const isPasswordMatch =  await bcrypt.compare(req.body.password, user.password);
            if(isPasswordMatch)
            {
                const passwordnew = await bcrypt.hash(req.body.newpassword, 8)
               const update = await User.updateOne({Email:req.body.email},{$set: {password:passwordnew}});
               res.status(201).json({update });
               
            }
            
            else {
                res.json({msg:'Invalid'})
            }
            
            
            })

router.post("/ImageUpdate",upload.array('files', 10),async(req, res) => { 

    try{
        const reqFiles = []
        const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files.length; i++) {
            reqFiles.push(url + '/uploads/' + req.files[i].filename)
            }

            const update = await User.updateOne({_id:req.body._id},{$set: { files:reqFiles}})
            res.status(201).json({ update });
        }catch(err){
            res.status(400).json({ err: err });
        }

        })  
          
        
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

module.exports = router;