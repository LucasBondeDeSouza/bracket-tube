import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import { fileURLToPath } from "url";
import { dirname } from "path";

export const app = express()

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://bracket-tube.vercel.app",
    credentials: true,
}))
app.use("/tmp", express.static(__dirname + "/tmp"))
app.use(routes)