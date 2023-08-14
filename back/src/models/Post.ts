import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  message: string;
  user: Schema.Types.ObjectId;
  date: Date;
}

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<IPost>("Post", postSchema);
