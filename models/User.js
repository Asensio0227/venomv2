const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    trim: true,
  },
  surname: {
    type: String,
    minlength: 5,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 35,
    validate: {
      validator: validator.isEmail,
      message: 'Provide a valid email'
    },
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide password'],
    minlength: 6,
  },
  roles:{
    type: String,
    default: "user",
    enum:['admin','user','owner']
  },
  userProfile: {
    type: String,
    default:'/uploads/user.jpg'
  },
  verificationToken:String,
  isVerified: {
    type: String,
    default:false,
  },
  verified: Date,
  passwordToken:{
    type:String
  },
  passwordTokenExpirationDate:{
    type:Date
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function () {
  if (!this.isModified("password")) return;
  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt)
});

UserSchema.methods.ComparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema);