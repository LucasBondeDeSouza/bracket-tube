import { Router } from "express";
import UserRoutes from "../domains/users/routes.js"
import TournamentRoutes from "../domains/tournaments/routes.js"

const router = Router()

router.use("/users", UserRoutes)
router.use("/tournaments", TournamentRoutes)

export default router