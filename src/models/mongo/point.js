import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointSchema = new Schema({
  name: String,
  country: String,
  description: String,
  categories: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Point = Mongoose.model("POI", pointSchema);
