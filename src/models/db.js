// import { userMemStore } from "./mem/user-mem-store.js";
// import { pointMemStore } from "./mem/point-mem-store.js";
// import { pointDetailMemStore } from "./mem/point-detail-mem-store.js";

import { userMemStore } from "./mem/user-mem-store.js";
import { pointMemStore } from "./mem/point-mem-store.js";
import { commentMemStore } from "./mem/pointDetail-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { pointJsonStore } from "./json/point-json-store.js";
import { commentJsonStore } from "./json/pointDetail-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pointMongoStore } from "./mongo/point-mongo-store.js";
import { commentMongoStore } from "./mongo/comment-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  pointStore: null,
  commentStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.pointStore = pointJsonStore;
        this.commentStore = commentJsonStore;
        break;
        case "mongo" :
          this.userStore = userMongoStore;
          this.pointStore = pointMongoStore;
          this.commentStore = commentMongoStore;
          connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.pointStore = pointMemStore;
        this.commentStore = commentMemStore;
    }
  },
};