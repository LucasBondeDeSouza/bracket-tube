import { model, Schema } from "mongoose";

const videosSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
  title: { type: String, required: true },
  video_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default model("Video", videosSchema);