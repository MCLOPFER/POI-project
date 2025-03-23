import { db } from "../models/db.js";
import { CommentSpec, UpdatePointSpec } from "../models/joi-schemas.js";

export const pointController = {
  index: {
    handler: async function (request, h) {
      console.log("Rendering point controller index")
      const point = await db.pointStore.getPointById(request.params.id);
      const viewData = {
        title: "Point",
        point: point,
      };
      return h.view("point-view", viewData); 
    },
  },

  editPoint: {
    handler: async function (request, h) {
      console.log("Editing place mark")
      const point = await db.pointStore.getPointById(request.params.id);
      const viewData = {
        title: "Edit Point",
        point: point,
      };
      return h.view("edit-view", viewData);
    },
  },

  addComment: {
    validate: {
      payload: CommentSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("Failed to add comment")
        const point = await db.pointStore.getPointById(request.params.id);
        const viewData = {
          title: "Add comment error",
          errors: error.details,
          point: point,
        };
        return h.view("point-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      console.log("Comment added succesfully")
      const newComment = {
        comment: request.payload.comment
      };
      const point = await db.pointStore.getPointById(request.params.id);
      await db.commentStore.addComment(point._id, newComment);
      return h.redirect(`/point/${point._id}`);
    },
  },

  deleteComment: {
    handler: async function (request, h) {
      console.log("Deleting comment")
      const point = await db.pointStore.getPointById(request.params.id);
      await db.commentStore.deleteComment(request.params.commentid);
      return h.redirect(`/point/${point._id}`);
    },
  },

  deleteAllComments: {
    handler: async function (request, h) {
      console.log("Deleting all comments")
      const point = await db.pointStore.getPointById(request.params.id);
      await db.commentStore.deleteAllComments();
      return h.redirect(`/point/${point._id}`);
   }
  },
  updatePoint: {
    validate: {
      payload: UpdatePointSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("Failed to update place mark")
        const point = await db.pointStore.getPointById(request.params.id);
        const viewData = {
          title: "Edit point error",
          errors: error.details,
          point: point,
        };
        return h.view("edit-view", viewData).takeover().code(400);
      },

    },
    handler: async function (request, h) {
      console.log("Updating place mark")
      const point = await db.pointStore.getPointById(request.params.id);
      const updatedPoint = {
        description: request.payload.description,
        categories: request.payload.categories
      };
      await db.pointStore.updatePoint(point, updatedPoint);
      return h.redirect(`/point/${request.params.id}`);
    },
  },
};