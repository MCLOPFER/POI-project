import Mongoose from "mongoose";
import { Point } from "./point.js";
import { commentMongoStore } from "./pointDetail-mongo-store.js";

export const pointMongoStore = {
  async getAllPoints() {
    const points = await Point.find().lean();
    return points;
  },

  async getPointById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const point = await Point.findOne({ _id: id }).lean();
      if (point) {
        point.comments = await commentMongoStore.getCommentsByPointId(point._id);
      }
      return point;
    }
    return null;
  },

  async addPoint(point) {
    const newPoint = new Point(point);
    const pointObj = await newPoint.save();
    return this.getPointById(pointObj._id);
  },

  async getUserPoints(id) {
    const point = await Point.find({ userid: id }).lean();
    return point;
  },

  async deletePointById(id) {
    try {
      await Point.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPoints() {
    await Point.deleteMany({});
  }
};
