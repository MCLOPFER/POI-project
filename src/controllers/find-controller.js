import { db } from "../models/db.js";

export const findController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "Find a location",
      };
      return h.view("find-view", viewData);
    },
  },

  addPoint: {
    handler: async function (request, h) {
      const newPoint = {
        name: request.payload.name,
        description: request.payload.description
      };
      await db.pointStore.addPoint(newPoint);
      return h.redirect("/dashboard");
    },
  },
};