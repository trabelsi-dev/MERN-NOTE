const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

//import User from "../models/userModel.js";
//import asyncHandler from "express-async-handler";

//hedi middleware protect bech hawka fi kol function ba3id ichouf se3a user 3andou w token w w mawjoud w le bch nijim ba3id tit3ada w ta3mil fct

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
  //  console.log("55555555555");
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("1")
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if decoded mrgl so 
      req.user = await User.findById(decoded.id).select("-password");
      next();
     

    } catch (error) {
      console.log("54")
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


module.exports = {protect}

//export { protect };   