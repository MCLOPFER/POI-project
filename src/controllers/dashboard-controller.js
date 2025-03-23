import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const points = await db.pointStore.getUserPoints(loggedInUser._id);

      const viewData = {
        title: "Place Mark Dashboard",
        user: loggedInUser,
        points: points,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  deletePoint: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      await db.pointStore.deletePointById(point._id);
      return h.redirect("/dashboard");
    },
  },

  deleteAllPoints: {
    handler: async function (request, h) {
      console.log("Deleting all points")
      await db.pointStore.deleteAllPoints();
      return h.redirect("/dashboard");
   }
  },
};
