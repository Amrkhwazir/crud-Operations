import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../modules/User.js";

// register
export const register = async (req, res, next) => {

  try{
      
  const salt = await bcrypt.genSalt(10);
  const hashedPasscode = await bcrypt.hash(req.body.password, salt); 
  const newUser = new User({...req.body, password: hashedPasscode });
  
  await newUser.save();   
  res.status(200).json(newUser);
  
  }catch (err){
  next(err)
  }
  
  };
  
  // signin
  export const login = async(req, res) => {
      try {
          const loggedUser = await User.findOne({email: req.body.email});
          !loggedUser && res.status(404).json("wrong email");
  
          const validPasscode = bcrypt.compareSync(req.body.password, loggedUser.password);
          !validPasscode && res.status(400).json("wrong password");
  
          res.status(200).json(loggedUser);
  
      } catch (error) {
  
          console.log(error);
          res.status(500).json("user not found")
          
      }; 
  };

  // get user
export const getProfile = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
      const getUser = userId ? await User.findById(userId) :  await User.findOne({ name: username});
      const {password, updatedAt, ...other} = getUser._doc       
      res.status(200).json(other)

  } catch (error) {
      res.status(500).json(error)
  }
};
