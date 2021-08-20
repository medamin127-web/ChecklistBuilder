const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    name: String,
    Email: String,
    password: String,
    Country: String,
    Speciality: {
        type: String,
    },
    image: {
        type: String
    },
    tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
          ],
    files: {
        type: Array
        },
});

//this method will hash the password before saving the user model
userSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.Email, country: user.Country, speciality: user.Speciality, image: user.image },
        "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (Email, password) => {
    const user = await User.findOne({ Email });
    if (!user) {
        return {msg:'Email Invalid'}
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return {msg:'Password invalid'}
    }
    return user;
  };
  

const User = mongoose.model("User", userSchema);
module.exports = User;