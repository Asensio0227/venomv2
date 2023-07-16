const mongoose=require('mongoose')

const commentSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: [true,"Please provide comment"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  stream: {
    type: mongoose.Schema.ObjectId,
    ref: "Stream",
    required: true
  }

},
  {
    timestamps: true
  });

commentSchema.index({ stream: 1, user: 1 }, { unique: true });

commentSchema.statics.calculateAverageComments = async function (streamId) {
  const result = await this.aggregate([
    {
      $match:{stream:streamId}
    },
    {
      $group: {
        _id: null,
        numOfComments:{$sum:1}
      }
    }
  ])

  try {
    await this.model(`Stream`).findOneAndUpdate(
      { _id: streamId },
      {
        numOfComments: result[0]?.numOfComments || 0,
      }
    )
  } catch (error) {
    console.log(error);
  }
}

commentSchema.post('save', async function () {
  await this.constructor.calculateAverageComments(this.stream)
})

commentSchema.post('remove', async function () {
  await this.constructor.calculateAverageComments(this.stream)
});

module.exports = mongoose.model('Comment', commentSchema);