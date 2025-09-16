import { Router } from "express";
import UserRoutes from "../domains/users/routes.js"
import TournamentRoutes from "../domains/tournaments/routes.js"
import VideoRoutes from "../domains/videos/routes.js"

const router = Router()

router.use("/users", UserRoutes)
router.use("/tournaments", TournamentRoutes)
router.use("/videos", VideoRoutes)

export default router