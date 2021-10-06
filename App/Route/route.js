const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../Model/User");
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const userController = require("../controller/userController");

const DIR = './images/';

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
            State: req.body.State,
            Speciality: req.body.Speciality,
            image: 'https://www.debiteuren365.nl/wp-content/uploads/unknown-profile-icon-debiteuren365.png'
            
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

   
router.route("/UploadImage").post(upload.single('image'),async(req, res, next) => {
              try {
                  
                  const url = req.protocol + '://' + req.get('host')
                  let picture = url + '/images/' + req.file.filename
                  
              
             
                  res.status(201).json({picture });
                   } catch (err) {
                     res.status(400).json({ err: err });
                     console.log(err)
                   }
                             })   

router.route("/ImageUpdate").post(upload.single('image'),async(req, res, next) => {
  try {
      
      const image = req.body.files
      const url = req.protocol + '://' + req.get('host')
      let picture = url + '/images/' + image
      
      const update =  await User.updateOne({_id:req.body.id},{$set: {image:picture}});
 
      res.status(201).json({update });
       } catch (err) {
         res.status(400).json({ err: err });
         console.log(err)
       }
                 })   
             
      
                
router.route('/add').post(upload.single('image'), (req, res) => {
                  
                  const image = req.file.filename
                  
                  const newUserData = {
                     
                      image
                  }
              
                  const newUser = new User(newUserData);
              
                  newUser.save()
                         .then(() => res.json('User Added'))
                         .catch(err => res.status(400).json('Error: ' + err));
              });

  router.post("/Findname",async(req,res)=> {
          User.find(req.body,(error, data) => {
          if (error) {
            res.json({msg:'Invalid'})
          } else {
            res.json(data)
          }
         })
       })

       router.post("/FindDoctorById",async(req,res)=> {
    
        User.findById(req.body.id,(err, data) => {
          if (err) {
            res.json({msg:'Invalid'})
          } else {
            res.json(data)
          }
         })
      })
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

module.exports = router;