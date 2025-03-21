import { db } from "../models/db.js";
import { CommentSpec } from "../models/joi-schemas.js";

export const pointController = {
  index: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      const viewData = {
        title: "Point",
        point: point,
      };
      return h.view("point-view", viewData);
    },
  },

  addComment: {
    validate: {
      payload: CommentSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("point-view", { title: "Add comment error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      const newComment = {
        comment: request.payload.comment
      };
      await db.commentStore.addComment(point._id, newComment);
      return h.redirect(`/point/${point._id}`);
    },
  },

  deleteComment: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      await db.commentStore.deleteComment(request.params.commentid);
      return h.redirect(`/point/${point._id}`);
    },
  },
};