import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { pointDetailJsonStore } from "./pointDetail-json-store.js";

export const pointJsonStore = {
  async getAllPoints() {
    await db.read();
    return db.data.point;
  },

  async addPoint(point) {
    await db.read();
    point._id = v4();
    db.data.points.push(point);
    await db.write();
    return point;
  },

  async getPointById(id) {
    await db.read();
    const list = db.data.points.find((point) => point._id === id);
    list.pointDetails = await pointDetailJsonStore.getPointDetailsByPointId(list._id);
    return list;
  },

  async getUserPoints(userid) {
    await db.read();
    return db.data.points.filter((point) => point.userid === userid);
  },

  async deletePointById(id) {
    await db.read();
    const index = db.data.points.findIndex((point) => point._id === id);
    db.data.points.splice(index, 1);
    await db.write();
  },

  async deleteAllPoints() {
    db.data.points = [];
    await db.write();
  },
};
