import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { findController } from "./controllers/find-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { pointController } from "./controllers/point-controller.js";
import { userController } from "./controllers/user-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/user/{id}", config: userController.index },
  { method: "POST", path: "/user/{id}/update", config: userController.update },
  
  { method: "GET", path: "/find", config: findController.index },
  { method: "POST", path: "/find/addpoint", config: findController.addPoint },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/dashboard/deletepoint/{id}", config: dashboardController.deletePoint },
  { method: "GET", path: "/dashboard/{id}/deleteallpoints", config: dashboardController.deleteAllPoints },

  { method: "GET", path: "/point/{id}", config: pointController.index },
  { method: "POST", path: "/point/{id}/addcomment", config: pointController.addComment },
  { method: "GET", path: "/point/{id}/deletecomment/{commentid}", config: pointController.deleteComment },
  { method: "GET", path: "/point/{id}/deleteallcomments", config: pointController.deleteAllComments },

  { method: "GET", path: "/point/{id}/editpoint", config: pointController.editPoint },
  { method: "POST", path: "/point/{id}/updatepoint", config: pointController.updatePoint },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];