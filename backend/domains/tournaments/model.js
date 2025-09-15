import { model, Schema } from "mongoose"

const tournamentsSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    coverImage: String,
    created_at: { type: Date, default: Date.now }
})

export default model("Tournament", tournamentsSchema)