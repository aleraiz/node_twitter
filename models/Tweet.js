const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  text: {
    type: String,
    maxLength: 140,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  likes: Number,
});

module.exports = mongoose.model("Tweet", tweetSchema);
