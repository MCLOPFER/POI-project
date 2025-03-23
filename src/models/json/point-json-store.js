import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { commentJsonStore } from "./pointDetail-json-store.js";

export const pointJsonStore = {
  
  async getAllPoints() {
    await db.read();
    return db.data.points;
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
    let list = db.data.points.find((point) => point._id === id);
    if (list) {
      list.comments = await commentJsonStore.getCommentsByPointId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPoints(userid) {
    await db.read();
    return db.data.points.filter((point) => point.userid === userid);
  },

  async deletePointById(id) {
    await db.read();
    const index = db.data.points.findIndex((point) => point._id === id);
    if (index !== -1) db.data.points.splice(index, 1);
    await db.write();
  },

  async deleteAllPoints() {
    db.data.points = [];
    await db.write();
  },
};
