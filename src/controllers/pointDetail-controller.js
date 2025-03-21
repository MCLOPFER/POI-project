import { PointDetailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const PointDetailController = {
  index: {
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.id);
      const pointDetail = await db.pointDetailStore.getPointDetailById(request.params.pointDetailid);
      const viewData = {
        title: "Edit Song",
        point: point,
        pointDetail: pointDetail,
      };
      return h.view("pointDetail-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PointDetailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("pointDetail-view", { title: "Edit pointDetail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const pointDetail = await db.pointDetailStore.getPointDetailById(request.params.pointDetailid);
      const newPointDetail = {
        description: request.payload.description,
        categories: request.payload.categories,
        images: request.payload.images,
        comments: request.payload.comments
      };
      await db.pointDetailStore.updatePointDetail(pointDetail, newPointDetail);
      return h.redirect(`/point/${request.params.id}`);
    },
  },
};