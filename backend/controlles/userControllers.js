const asyncHandler = require('express-async-handler')
//const User = require('../models/userModel')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


// asyncHandler pour handler all of the errors that are going to be in our application
//hedi il5idma ta3 register  
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error("User already exist ...")
    }
// if user not exist
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    //if succefully created so :
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("error occured")
    }
  
});



//login 

const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)

        })
    }else {
        res.status(400);
        throw new Error("error occured")
    }
   
      
  
});

const updateUserProfile = asyncHandler(async(req,res) => {
    // id bech tjina mil fct protect
    const user =await User.findById(req.user._id)
    if(user){
        user.name =req.body.name || user.name;
        user.email =req.body.email || user.email;
        user.pic =req.body.pic || user.pic;
    
    if(req.body.password) {
        user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        pic:updatedUser.pic,
        token:generateToken(updatedUser._id)
    })
    }else {
        res.status(404);
        throw new Error("User not found ")
    }
})

module.exports = {registerUser,authUser,updateUserProfile}