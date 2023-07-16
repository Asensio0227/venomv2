const mongoose=require('mongoose');

const StreamsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, "Title can not be more than 100 characters"],
  },
  description: {
    type: String,
    maxlength: [1000, "Description can not be more than 100 characters"],
  },
  video: {
    type: String,
    // default: "/streams/sasha.mp4",
    require:true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

StreamsSchema.virtual('comments', {
  ref: "Comment",
  localField: "_id",
  foreignField: "stream",
  justOne: false
});

StreamsSchema.pre('remove', async function (next) {
  await this.model('Comment').deleteMany({ stream: this._id });
})

module.exports = mongoose.model('Stream', StreamsSchema);