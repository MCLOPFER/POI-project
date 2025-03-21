// import { userMemStore } from "./mem/user-mem-store.js";
// import { pointMemStore } from "./mem/point-mem-store.js";
// import { pointDetailMemStore } from "./mem/point-detail-mem-store.js";

import { userMemStore } from "./mem/user-mem-store.js";
import { pointMemStore } from "./mem/point-mem-store.js";
import { pointDetailMemStore } from "./mem/pointDetail-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { pointJsonStore } from "./json/point-json-store.js";
import { pointDetailJsonStore } from "./json/pointDetail-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pointMongoStore } from "./mongo/point-mongo-store.js";
import { pointDetailMongoStore } from "./mongo/pointDetail-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  pointStore: null,
  pointDetailStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.pointStore = pointJsonStore;
        this.pointDetailStore = pointDetailJsonStore;
        break;
        case "mongo" :
          this.userStore = userMongoStore;
          this.pointStore = pointMongoStore;
          this.pointDetailStore = pointDetailMongoStore;
          connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.pointStore = pointMemStore;
        this.pointDetailStore = pointDetailMemStore;
    }
  },
};