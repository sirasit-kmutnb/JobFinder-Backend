const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    author_id: {
      type: String,
      required: true,
    },
    details: {
      type: {},
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
