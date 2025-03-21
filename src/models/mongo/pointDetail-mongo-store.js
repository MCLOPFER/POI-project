import Mongoose from "mongoose";
import { Comment } from "./pointDetail.js";
import { Point } from "./point.js";

export const commentMongoStore = {
  async getAllComments() {
    const comments = await Comment.find().lean();
    return comments;
  },

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

  async updateComment(comment, updatedComment) {
    const commentDoc = await Comment.findOne({ _id: comment._id });
    commentDoc.description = updatedComment.description;
    commentDoc.categories = updatedComment.categories;
    await commentDoc.save();
  },
};