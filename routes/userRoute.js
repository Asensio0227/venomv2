const express = require('express');
const router = express.Router();

const {
  authenticatedUser,
  authorizedPermissions
} = require('../middleware/auth');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updatePasswordUser,
  updateUser,
  deleteUser,
  userProfile
} = require('../controllers/usersController')
const testUser = require('../middleware/testUser');


const { getSingleUSerVideos } = require('../controllers/streamController');

router
  .route('/')
  .get(authenticatedUser, authorizedPermissions('admin',"user"),testUser, getAllUsers)
router
  .route('/showCurrentUser')
  .get(authenticatedUser, showCurrentUser)
router
  .route('/updatePassword')
  .patch(authenticatedUser, testUser,updatePasswordUser)
router
.route('/updateUser')
  .patch(authenticatedUser, testUser,updateUser);
router
  .route('/uploads')
  .post(authenticatedUser,testUser,userProfile)
router
  .route('/:id')
  .get(authenticatedUser, authorizedPermissions('admin',"user"),getSingleUser);
router
  .route('/:id')
  .delete(authenticatedUser, authorizedPermissions('admin'),testUser, deleteUser)
router.route('/:id/singleVideos').get(getSingleUSerVideos);

module.exports = router;

