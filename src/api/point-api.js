import Boom from "@hapi/boom";
import { IdSpec, PointArraySpec, PointSpec, PointSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const pointApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const points = await db.pointStore.getAllPoints();
        return points;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PointArraySpec, failAction: validationError },
    description: "Get all points",
    notes: "Returns all points",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        return point;
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id");
      }
    },
    tags: ["api"],
    description: "Find a Point",
    notes: "Returns a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const point = request.payload;
        const newPoint = await db.pointStore.addPoint(point);
        if (newPoint) {
          return h.response(newPoint).code(201);
        }
        return Boom.badImplementation("error creating point");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Point",
    notes: "Returns the newly created point",
    validate: { payload: PointSpec, failAction: validationError },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        await db.pointStore.deletePointById(point._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id");
      }
    },
    tags: ["api"],
    description: "Delete a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.pointStore.deleteAllPoints();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PointApi",
  },
};