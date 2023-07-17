const Stream = require('../models/Streams');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadVideo = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('Please upload a file')
  }
  const videoFile = req.files.video;
  const extensionName = path.extname(videoFile.name)
  const allowExtension = extensionName.slice(1);
  if (!allowExtension) {
    throw new CustomError.BadRequestError(`Invalid video:  ${videoFile.name}`)
  }
  const videoPath = path.join(__dirname, "../public/streams/" + `${videoFile.name}`);
  console.log(videoPath);
  await videoFile.mv(videoPath);
  
  res.status(StatusCodes.OK).json({ video: `/streams/${videoFile.name}` });
};

const postVideo = async (req, res) => {
  req.body.user = req.user.userId;
  const streams = await Stream.create(req.body );
  res.status(StatusCodes.CREATED).json({video: streams });
}
const getAllVideos = async (req, res) => {
  req.body.user = req.user.userId;
  const streams = await Stream.find({}).populate('comments').sort('-createdAt');
  res.status(StatusCodes.OK).json({ videos: streams, numOfVideo: streams.length });
}

const deleteVideo = async (req, res) => {
  const streamId = req.params.id;
  req.body.user = req.user.userId;
  const stream = await Stream.findOne({ _id: streamId });
  if (!stream) {
    throw new CustomError.UnauthenticatedError(`No stream with id :${streamid}`)
  }
  await stream.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "stream has been deleted" });
}
const getSingleUSerVideos = async (req, res) => {
  const {
    id: userId
  } = req.params;
  const streams = await Stream.find({ user: userId });

  res.status(StatusCodes.OK).json({ streams, count: streams.length });
}


module.exports = {
  uploadVideo,
  postVideo,
  getAllVideos,
  deleteVideo,
  getSingleUSerVideos
}