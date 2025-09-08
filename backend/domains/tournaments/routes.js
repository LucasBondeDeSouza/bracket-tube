import { Router } from "express";
import Tournament from "./model.js"
import { JWTVerify } from "../../utils/jwt.js"
import { connectDb } from "../../config/db.js"

const router = Router()

router.post('/', async (req, res) => {
    connectDb()

    const { title, description, coverImage } = req.body

    try {
        const { _id: owner } = await JWTVerify(req)

        const newTournamentDoc = await Place.create({
            owner, 
            title, 
            description, 
            coverImage
        })

        res.json(newTournamentDoc)
    } catch (error) {
        console.error(error)
        res.status(500).json('Deu erro ao criar um novo torneio', error)
    }
})

export default router