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
    return pointDetails.find((pointDetail) => pointDetail._id === id);
  },

  async getPointPointDetails(pointId) {
    return pointDetails.filter((pointDetail) => pointDetail.pointid === pointId);
  },

  async deletePointDetail(id) {
    const index = pointDetails.findIndex((pointDetail) => pointDetail._id === id);
    pointDetails.splice(index, 1);
  },

  async deleteAllPointDetails() {
    pointDetails = [];
  },

  async updatePointDetail(pointDetail, updatedpointDetail) {
    pointDetail.name = updatedpointDetail.title;
  },
};