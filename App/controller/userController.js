const User = require("../Model/User");

exports.loginUser = async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    const user =  await User.findByCredentials(email,password);
    if (!user) {
      return res.status(401).json({ error: "Login failed! Check authentication credentials" });
    } 
    res.status(201).json({ user });
    
  };

exports.getUserDetails = async(req, res) => {
    await res.json(req.userData);
};