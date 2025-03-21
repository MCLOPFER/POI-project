import Mongoose from "mongoose";
import { PointDetail } from "./pointDetail.js";
import { Point } from "./point.js";

export const pointDetailMongoStore = {
  async getAllPointDetails() {
    const pointDetails = await PointDetail.find().lean();
    return pointDetails;
  },

  async addPointDetail(pointId, pointDetail) {
    pointDetail.pointid = pointId;
    const newPointDetail = new PointDetail(pointDetail);
    const pointDetailObj = await newPointDetail.save();
    return this.getPointDetailById(pointDetailObj._id);
  },

  async getPointDetailsByPointId(id) {
    const pointDetails = await PointDetail.find({ pointid: id }).lean();
    return pointDetails;
  },

  async getPointDetailById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const pointDetail = await PointDetail.findOne({ _id: id }).lean();
      return pointDetail;
    }
    return null;
  },

  async deletePointDetail(id) {
    try {
      await PointDetail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPointDetails() {
    await PointDetail.deleteMany({});
  },

  async updatePointDetail(pointDetail, updatedPointDetail) {
    const pointDetailDoc = await PointDetail.findOne({ _id: pointDetail._id });
    pointDetailDoc.description = updatedPointDetail.description;
    pointDetailDoc.categories = updatedPointDetail.categories;
    await pointDetailDoc.save();
  },
};