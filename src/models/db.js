import { userMemStore } from "./mem/user-mem-store.js";
import { pointMemStore } from "./mem/point-mem-store.js";
import { pointDetailMemStore } from "./mem/point-detail-mem-store.js";

export const db = {
  userStore: null,
  pointStore: null,
  pointDetailStore: null,

  init() {
    this.userStore = userMemStore;
    this.pointStore = pointMemStore;
    this.pointDetailStore = pointDetailMemStore;
  },
};
