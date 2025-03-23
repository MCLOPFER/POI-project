import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const commentApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comments = await db.commentStore.getAllComments();
        return comments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const comment = await db.commentStore.getCommentById(request.params.id);
        if (!comment) {
          return Boom.notFound("No comment with this id");
        }
        return comment;
      } catch (err) {
        return Boom.serverUnavailable("No comment with this id:", err);
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comment = await db.commentStore.addComment(request.params.id, request.payload);
        if (comment) {
          return h.response(comment).code(201);
        }
        return Boom.badImplementation("error creating comment");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.commentStore.deleteAllComments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comment = await db.commentStore.getCommentById(request.params.id);
        if (!comment) {
          return Boom.notFound("No Comment with this id");
        }
        await db.commentStore.deleteComment(comment._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Comment with this id:", err);
      }
    },
  },
};