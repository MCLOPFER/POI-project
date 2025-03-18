import { db } from "../models/db.js";
import { pointMemStore } from "../models/mem/point-mem-store.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const points = await db.pointStore.getAllPoints();
      const viewData = {
        title: "Place Mark Dashboard",
        points: points,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPoint: {
    handler: async function (request, h) {
      const newPoint = {
        name: request.payload.name,
        description: request.payload.description
      };
      await db.pointStore.addPoint(newPoint);
      return h.redirect("dashboard-view");
    },
  },

  deletePoint: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      await db.pointStore.deletePointById(point._id);
      return h.redirect("/dashboard");
    },
  },
};
