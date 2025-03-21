import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  categories: String,
  comment: String,
  pointid: {
    type: Schema.Types.ObjectId,
    ref: "POI",
  },
});

export const Comment = Mongoose.model("Comment - Point Details", commentSchema);
