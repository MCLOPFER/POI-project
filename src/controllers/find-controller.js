import { db } from "../models/db.js";

export const findController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const points = await db.pointStore.getUserPoints(loggedInUser._id);

      const viewData = {
        title: "Place Mark Dashboard",
        user: loggedInUser,
        points: points,
      };
      return h.view("find-view", viewData);
    },
  },

  addPoint: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoint = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description
      };
      await db.pointStore.addPoint(newPoint);
      return h.redirect("/dashboard");
    },
  },
};