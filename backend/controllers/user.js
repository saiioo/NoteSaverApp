const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Person = require('../models/user')





const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const foundUser = await Person.findOne({ email: email });

    if (!foundUser) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    console.log(foundUser,token)
    delete foundUser.password;
    res.status(200).json({ token, user: foundUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const signup = async ( req,res ) =>{
  try{
    const {
      email,
      password 
    } = req.body
//     const find = Person.find({email:email})
//     if(find){
//       return res.status(409).json({message:"Already registerd"})
//     }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new Person({
      email,
      password : passwordHash
    })

    const savedUser = await newUser.save()
    res.status(201).json({savedUser})
  } catch( err ){
    res.status(400).json({ error : err.message})
  }
};

module.exports = { login, signup}
