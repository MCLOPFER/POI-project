import { v4 } from "uuid";
import { pointDetailMemStore } from "./point-detail-mem-store.js";

let points = [];

export const pointMemStore = {
  async getAllPoints() {
    return points;
  },

  async addPoint(point) {
    point._id = v4();
    points.push(point);
    return point;
  },

  async getPointById(id) {
    const list = points.find((point) => point._id === id);
    list.pointDetails = await pointDetailMemStore.getPointDetailsByPointId(list._id);
    return list;
  },

  async getUserPoints(userid) {
    return points.filter((point) => point.userid === userid);
  },

  async deletePointById(id) {
    const index = points.findIndex((point) => point._id === id);
    points.splice(index, 1);
  },

  async deleteAllPoints() {
    points = [];
  },
};