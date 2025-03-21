import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const commentJsonStore = {
  async getAllComments() {
    await db.read();
    return db.data.comments;
  },

  async addComment(pointId, comment) {
    await db.read();
    comment._id = v4();
    comment.pointid = pointId;
    db.data.comments.push(comment);
    await db.write();
    return comment;
  },

  async getCommentsByPointId(id) {
    await db.read();
    let foundComments = db.data.comments.filter((comment) => comment.pointid === id);
    if (!foundComments) {
      foundComments = null;
    }
    return foundComments;
  },

  async getCommentById(id) {
    await db.read();
    let foundComment = db.data.comments.find((comment) => comment._id === id);
    if (!foundComment) {
      foundComment = null;
    }
    return foundComment;
  },

  async getPointComments(pointId) {
    await db.read();
    let foundComments = comments.filter((comment) => comment.pointid === pointId);
    if (!foundComments) {
      foundComments = null;
    }
    return foundComments;
  },

  async deleteComment(id) {
    await db.read();
    const index = db.data.comments.findIndex((comment) => comment._id === id);
    db.data.comments.splice(index, 1);
    await db.write();
  },

  async deleteAllComments() {
    db.data.comments = [];
    await db.write();
  },

  async updateComment(comment, updatedComment) {
    comment.description = updatedComment.description;
    comment.categories = updatedComment.categories;
    await db.write();
  },
};
