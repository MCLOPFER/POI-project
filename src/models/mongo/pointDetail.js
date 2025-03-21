import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointDetailSchema = new Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  categories: String,
  pointid: {
    type: Schema.Types.ObjectId,
    ref: "POI",
  },
});

export const PointDetail = Mongoose.model("Point Details", pointDetailSchema);
