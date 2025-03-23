import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  comment: String,
  pointid: {
    type: Schema.Types.ObjectId,
    ref: "point",
  },
});

export const Comment = Mongoose.model("Comment - Point Details", commentSchema);
