const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email address"],
    unique: [true, "Please try a different email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  password: {
    type: String,
    minLenght: [6, "Please provide a password with min length 6"],
    required: [true, "Please try a different password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

//UserSchema Method
UserSchema.methods.generateJwtFromUser = function(){
  const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env

  const payload ={
    id: this.id,
    name : this.name,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE
  });
  return token;
}
//Parola Hashleme
UserSchema.pre("save", function (next) {
  //parola Değişmemişse
  if (!this.isModified("password")) {//isModified fonksiyonu mongoDB tarafından gelen bir özelliktir. Eğer değer değişmişse false döner 
    bcrypt.genSalt(10, (err, salt) => {
      if (err) next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) next(err);
        this.password = hash;
        next();
      });
    });
  }
});
module.exports = mongoose.model("User", UserSchema);
