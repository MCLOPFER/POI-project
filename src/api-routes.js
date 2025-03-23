import { userApi } from "./api/user-api.js";
import { pointApi } from "./api/point-api.js";
import { commentApi } from "./api/comment-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/points", config: pointApi.create },
  { method: "DELETE", path: "/api/points", config: pointApi.deleteAll },
  { method: "GET", path: "/api/points", config: pointApi.find },
  { method: "GET", path: "/api/points/{id}", config: pointApi.findOne },
  { method: "DELETE", path: "/api/points/{id}", config: pointApi.deleteOne },

  { method: "GET", path: "/api/comments", config: commentApi.find },
  { method: "GET", path: "/api/comments/{id}", config: commentApi.findOne },
  { method: "POST", path: "/api/points/{id}/comments", config: commentApi.create },
  { method: "DELETE", path: "/api/comments", config: commentApi.deleteAll },
  { method: "DELETE", path: "/api/comments/{id}", config: commentApi.deleteOne },
];