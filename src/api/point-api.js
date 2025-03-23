import Boom from "@hapi/boom";
import { PointSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const pointApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const points = await db.pointStore.getAllPoints();
        return points;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        return point;
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id:", err);
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const point = request.payload;
        const newPoint = await db.pointStore.addPoint(point);
        if (newPoint) {
          return h.response(newPoint).code(201);
        }
        return Boom.badImplementation("error creating point");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        await db.pointStore.deletePointById(point._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id:", err);
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.pointStore.deleteAllPoints();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },
};