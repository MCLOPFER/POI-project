import { db } from "../models/db.js";

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

  addPointDetail: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      const newPointDetail = {
        name: request.payload.name,
        description: request.payload.description,
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude)
      };
      await db.pointDetailStore.addPointDetail(point._id, newPointDetail);
      return h.redirect(`/point/${point._id}`);
    },
  },
};