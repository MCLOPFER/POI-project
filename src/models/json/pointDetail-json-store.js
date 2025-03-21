import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const pointDetailJsonStore = {
  async getAllPointDetails() {
    await db.read();
    return db.data.pointDetails;
  },

  async addPointDetail(pointId, pointDetail) {
    await db.read();
    pointDetail._id = v4();
    pointDetail.pointid = pointId;
    db.data.pointDetails.push(pointDetail);
    await db.write();
    return pointDetail;
  },

  async getPointDetailsByPointId(id) {
    await db.read();
    let foundPointDetails = db.data.pointDetails.filter((pointDetail) => pointDetail.pointid === id);
    if (!foundPointDetails) {
      foundPointDetails = null;
    }
    return foundPointDetails;
  },

  async getPointDetailById(id) {
    await db.read();
    let foundPointDetail = db.data.pointDetails.find((pointDetail) => pointDetail._id === id);
    if (!foundPointDetail) {
      foundPointDetail = null;
    }
    return foundPointDetail;
  },

  async getPointPointDetails(pointId) {
    await db.read();
    let foundPointDetails = pointDetails.filter((pointDetail) => pointDetail.pointid === pointId);
    if (!foundPointDetails) {
      foundPointDetails = null;
    }
    return foundPointDetails;
  },

  async deletePointDetail(id) {
    await db.read();
    const index = db.data.pointDetails.findIndex((pointDetail) => pointDetail._id === id);
    db.data.pointDetails.splice(index, 1);
    await db.write();
  },

  async deleteAllPointDetails() {
    db.data.pointDetails = [];
    await db.write();
  },

  async updatePointDetail(pointDetail, updatedPointDetail) {
    pointDetail.description = updatedPointDetail.description;
    pointDetail.categories = updatedPointDetail.categories;
    await db.write();
  },
};
