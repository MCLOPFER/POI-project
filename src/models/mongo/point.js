import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  description: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Point = Mongoose.model("POI", pointSchema);
