import { db } from "../models/db.js";
import { PointDetailSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PointDetailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("point-view", { title: "Add point detail error", errors: error.details }).takeover().code(400);
      },
    },
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