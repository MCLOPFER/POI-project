import { db } from "../models/db.js";
import { UpdateUserSpec } from "../models/joi-schemas.js";


export const userController = {

  index: {
    handler: async function (request, h) {
      console.log("Rendering user controller index")
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "User Settings",
        user: user,
        password: "********"
      };
      console.log("user details rendering");
      console.log(`XXXXXX ${user._id}`);
      return h.view("user-view", viewData); 
    },
  },

  update: {
    validate: {
      payload: UpdateUserSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("Failed to update user")
        const user = await db.userStore.getUserById(request.params.id);
        const viewData = {
          title: "Edit user error",
          errors: error.details,
          user: user,
          password: "********"
        };
        return h.view("user-view", viewData).takeover().code(400);
      },

    },
    handler: async function (request, h) {
      console.log("Updating user")
      const user = await db.userStore.getUserById(request.params.id);
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
      };
      await db.userStore.updateUser(user, updatedUser);
      return h.redirect(`/user/${request.params.id}`);
    },
  },
};