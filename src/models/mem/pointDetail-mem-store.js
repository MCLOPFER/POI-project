import { v4 } from "uuid";

let comments = [];

export const commentMemStore = {
  async getAllComments() {
    return comments;
  },

  async addComment(pointId, comment) {
    comment._id = v4();
    comment.pointid = pointId;
    comments.push(comment);
    return comment;
  },

  async getCommentsByPointId(id) {
    return comments.filter((comment) => comment.pointid === id);
  },

  async getCommentById(id) {
    let foundComment = comments.find((comment) => comment._id === id);
    if (!foundComment) {
      foundComment = null;
    }
    return foundComment;
  },

  async getPointComments(pointId) {
    let foundComments = comments.filter((comment) => comment.pointid === pointId);
    if (!foundComments) {
      foundComments = null;
    }
    return foundComments;
  },

  async deleteComment(id) {
    const index = comments.findIndex((comment) => comment._id === id);
    if (index !== -1) comments.splice(index, 1);
  },

  async deleteAllComments() {
    comments = [];
  },
};