const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticatedUser = async(req, res, next) => {
   const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      const testUser = payload.userId === process.env.TEST_USER_ID;
    const {
      name,
      userId,
      roles,
      surname,
      userProfile,
      email
    } = payload;
    req.user = {
      name,
      userId,
      roles,
      surname,
      userProfile,
      email,
      testUser
    };
      return next();
    }
    const payload = isTokenValid(refreshToken);
     const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
     });
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    const testUser = payload.userId === process.env.TEST_USER_ID;
    const {
      name,
      userId,
      roles,
      surname,
      userProfile,
      email
    } = payload;
    req.user = {
      name, userId, roles, surname,
      userProfile,
      email,
      testUser
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthorizedError('Authentication failed')
  }
}

const authorizedPermissions = (...roles)=>{
  return (req, res,next) => {
    if (!roles.includes(req.user.roles)) {
      throw new CustomError.UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}

module.exports = {
  authenticatedUser,
  authorizedPermissions
}