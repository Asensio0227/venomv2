const User =require('../models/User')
const Token =require('../models/Token')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const crypto = require('crypto');

const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail
} = require('../utils');

const register = async (req, res) => {
  const { email, name, surname, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const roles = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.create({
    email, 
    name,
    surname,
    password,
    roles,
    verificationToken
  });
  const origin = 'http://localhost:3000';
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, user: tokenUser });
  
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
}

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Verification Failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('Verification Failed');
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide all values")
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials")
  }
  
  const isPasswordCorrect = await user.ComparePassword(password);
  
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid password")
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email')
  };
  const tokenUser = createTokenUser({ user });
  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser,refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user: user._id }
  
  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  });

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  });

  res.status(StatusCodes.OK).json({ msg: `user logged out!` })
};

const forgotPassword = async (req, res) => {
  res.status(StatusCodes.OK).send("forgot password")
}

const resetPassword = async (req, res) => {
  res.status(StatusCodes.OK).send('reset password')
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
}