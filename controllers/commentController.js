const Stream = require('../models/Streams');
const Comment = require('../models/Comments');
const {StatusCodes}=require('http-status-codes') 
const { checkPermissions } = require('../utils');
const CustomError=require('../errors')

const createComment = async (req, res) => {
  const { stream: streamId } = req.body;
  const isValidStream = await Stream.findOne({ _id: streamId });
  if (!isValidStream) {
    throw new CustomError.NotFoundError(`No stream with id : ${streamId}`)
  }
  const alreadySubmitted = await Comment.findOne({
    stream: streamId,
    user: req.user.userId,
  })
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(`Already submitted comment for this video`)
  }
  req.body.user = req.user.userId;
  const comment = await Comment.create(req.body);
  res.status(StatusCodes.CREATED).json({ comment })
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find({}).populate({
    path: 'stream',
    select: 'video title description'
  })
    .populate({
      path: "user",
      select: 'userProfile name'
    })
    .sort("-createdAt");
  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

const getSingleComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findOne({ _id: commentId })
    .populate({
      path: 'stream',
      select: 'video title description'
    })
    .populate({
      path: "user",
      select: 'userProfile name'
    })
    .sort("-createdAt");
  
  if (!comment) {
    throw new CustomError.BadRequestError(`No comment with id:${commentId}`)
  }
  res.status(StatusCodes.OK).json({ comment })
};

const getSingleStreamComment = async (req, res) => {
  const {
    id: streamId
  } = req.params;
  const comments = await Comment.find({ stream: streamId })
    .populate({
      path: 'stream',
      select: 'video title description'
    })
    .populate({
      path: "user",
      select: 'userProfile name'
    })
    .sort("-createdAt");

  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findOne({ _id: commentId })
    .populate({
      path: 'stream',
      select: 'video title description'
    })
    .populate({
      path: "user",
      select: 'userProfile name'
    })
    .sort("-createdAt");
  if (!comment) {
    throw new CustomError.BadRequestError(`No comment with id:${commentId}`)
  }
  
  checkPermissions(req.user, comment.user);
  await comment.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'comment successful removed' })
};

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  getSingleStreamComment,
  deleteComment,
}