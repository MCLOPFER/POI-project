import Mongoose from "mongoose";
import { Comment } from "./comment.js";

export const commentMongoStore = {

  async addComment(pointId, comment) {
    comment.pointid = pointId;
    const newComment = new Comment(comment);
    const commentObj = await newComment.save();
    return this.getCommentById(commentObj._id);
  },

  async getCommentsByPointId(id) {
    const comments = await Comment.find({ pointid: id }).lean();
    return comments;
  },

  async getCommentById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const comment = await Comment.findOne({ _id: id }).lean();
      return comment;
    }
    return null;
  },

  async deleteComment(id) {
    try {
      await Comment.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllComments() {
    await Comment.deleteMany({});
  },
};