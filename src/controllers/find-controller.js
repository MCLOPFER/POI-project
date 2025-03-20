import { db } from "../models/db.js";
import { PointSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PointSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Point error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoint = {
        userid: loggedInUser._id,
        name: request.payload.name
      };
      await db.pointStore.addPoint(newPoint);
      return h.redirect("/dashboard");
    },
  },
};