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
};
