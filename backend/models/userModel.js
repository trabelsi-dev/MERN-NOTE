//import mongoose from "mongoose";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//import bcrypt from "bcryptjs";

// nasna3 schema te3i
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
      //pour me donne quand createdAt et updatedAt
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    // to compare password ili bech tiktbou w password ili fil base te3na 
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
//userSchema.pre("save" ya3ni 9bal ma tsajil a3mil function 
userSchema.pre("save", async function (next) {
    // si password not modified passe 
  if (!this.isModified("password")) {
    next();
  }
  // lina crypte password 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//lina hawka yasna3 model ib isim user a partir mil usershema 
const User = mongoose.model("User", userSchema);

module.exports = User
