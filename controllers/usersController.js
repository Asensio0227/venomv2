const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
  checkPermissions,
  attachCookiesToResponse,
  createTokenUser,
} = require('../utils');

const getAllUsers = async (req, res) => {
  let result = User.find({ roles: "user" }).select('-password');
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const friends = await result;
  res.status(StatusCodes.OK).json({ friends,count:friends.length });
}

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with id ${userId}`)
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user)
}

const updateUser = async (req, res) => {
  const { email, surname, name,userProfile } = req.body;
  
  const user = await User.findOne({ _id:req.user.userId });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with id ${req.used.userId}`)
  }

  user.surname = surname;
  user.email = email;
  user.name = name;
  user.userProfile = userProfile;
  
  await user.save();
  
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
}

const updatePasswordUser = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(`Please check if you entered new password`)
  }

  const user = await User.findOne({ _id: req.user.userId })
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with id ${req.used.userId}`)
  }

  const isPasswordCorrect = await user.ComparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  user.password = newPassword
  await user.save();
  res.status(StatusCodes.OK).json({msg:"password updated successfully!"})
}

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with id ${userId}`) 
  }

  await user.deleteOne();
 res.status(StatusCodes.OK).json({msg:`user removed`})
}

const userProfileLocal = async (req, res)=>{
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded')
  }
  const image = req.files.image;
  if(!image.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please upload image')
  }
  const maxSize = 2024 * 2024;
  if (image.size > maxSize) {
    throw new CustomError.BadRequestError(`Please upload image less than 2MB`)
  }
  const imagePath = path.join(__dirname, "../public/uploads/" + `${image.name}`)
  await image.mv(imagePath)
  res.status(StatusCodes.OK).json({ image: `/uploads/${image.name}` });
}

const userProfile= async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: `tiktok`
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: result.secure_url });
}



module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updatePasswordUser,
  updateUser,
  deleteUser,
  userProfile
};