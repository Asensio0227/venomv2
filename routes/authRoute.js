const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require('../controllers/authControllers');

const { authenticatedUser } = require('../middleware/auth');

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  window: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  }
})

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.delete('/logout', authenticatedUser, logout);

module.exports = router;