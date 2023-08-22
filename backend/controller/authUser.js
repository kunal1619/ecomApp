const signUpUser = require('../model/UserAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const createSignUpUser = async (req, res) => {
    try {
      const { username, email, password } = req.body; // Destructure fields from req.body
  
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
  
      let role = 'user'; // Default role
  
      if (email === 'admin@gmail.com') {
        role = 'admin';
      }
  
      // Create a new user instance
      const newUser = new signUpUser({
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      return res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error while creating signup user' });
      console.error(error);
    }
  };
  



const loginUser = async(req, res)=>{
try{
    const userEmail = req.body.email;
    const user = await signUpUser.findOne({email: userEmail});

    if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(passwordMatch){
            const logedInUser = {name : user.name, email : userEmail}
            const token = jwt.sign(logedInUser, process.env.SECRET_KEY)
            res.status(200).json({message: "Login successful", id : user._id, email : userEmail, role: user.role, token : token});
        }else{
            res.status(401).json({error: "Authentication failed"})
        }
    }
    
 
}catch(error){
    console.log('failed to login', error);
}
    
}

module.exports = {createSignUpUser, loginUser}