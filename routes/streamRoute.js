const express = require('express');
const router = express.Router();

const {
  authenticatedUser,
  authorizedPermissions
} = require('../middleware/auth');


const {
  uploadVideo,
  postVideo,
  getAllVideos,
  deleteVideo
} = require('../controllers/streamController');

const {
  getSingleStreamComment,
} = require('../controllers/commentController')
const testUser = require('../middleware/testUser');

router.route('/upload').post(authenticatedUser,authorizedPermissions('admin',"user"),testUser, uploadVideo);
router.route('/').post(authenticatedUser,authorizedPermissions('admin',"user"),testUser, postVideo);
router.route('/').get(authenticatedUser, getAllVideos);
router.route('/:id').delete(authenticatedUser,authorizedPermissions('admin',"user"),testUser, deleteVideo);
router.route('/:id/singleComment').get(authenticatedUser,getSingleStreamComment)

module.exports = router;