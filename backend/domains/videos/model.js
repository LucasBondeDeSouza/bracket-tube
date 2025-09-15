import { model, Schema } from "mongoose"

const videosSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "Torunament" },
    title: String,
    video_url: String,
})

export default model("Video", videosSchema)