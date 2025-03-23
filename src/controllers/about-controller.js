import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "About Place Mark",
        user: user
      };
      return h.view("about-view", viewData);
    },
  },
};