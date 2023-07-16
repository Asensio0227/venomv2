const express = require('express');
const router = express.Router();

const {
  authenticatedUser,
} = require('../middleware/auth');

const {
  createComment,
  getAllComments,
  getSingleComment,
  deleteComment,
} = require('../controllers/commentController')
const testUser = require('../middleware/testUser');

router.route('/').post(authenticatedUser,testUser, createComment);
router.route('/').get(getAllComments);
router.route('/:id').get(getSingleComment).delete(authenticatedUser,testUser, deleteComment);

module.exports = router;