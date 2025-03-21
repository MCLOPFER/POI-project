import { v4 } from "uuid";

let pointDetails = [];

export const pointDetailMemStore = {
  async getAllPointDetails() {
    return pointDetails;
  },

  async addPointDetail(pointId, pointDetail) {
    pointDetail._id = v4();
    pointDetail.pointid = pointId;
    pointDetails.push(pointDetail);
    return pointDetail;
  },

  async getPointDetailsByPointId(id) {
    return pointDetails.filter((pointDetail) => pointDetail.pointid === id);
  },

  async getPointDetailById(id) {
    let foundPointDetail = pointDetails.find((pointDetail) => pointDetail._id === id);
    if (!foundPointDetail) {
      foundPointDetail = null;
    }
    return foundPointDetail;
  },

  async getPointPointDetails(pointId) {
    let foundPointDetails = pointDetails.filter((pointDetail) => pointDetail.pointid === pointId);
    if (!foundPointDetails) {
      foundPointDetails = null;
    }
    return foundPointDetails;
  },

  async deletePointDetail(id) {
    const index = pointDetails.findIndex((pointDetail) => pointDetail._id === id);
    if (index !== -1) pointDetails.splice(index, 1);
  },

  async deleteAllPointDetails() {
    pointDetails = [];
  },

  async updatePointDetail(pointDetail, updatedpointDetail) {
    pointDetail.description = updatedpointDetail.description;
    pointDetail.categories = updatedpointDetail.categories;
  },
};