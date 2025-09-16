import { Router } from "express";
import Tournament from "./model.js"
import Video from "../videos/model.js"
import { JWTVerify } from "../../utils/jwt.js"
import { connectDb } from "../../config/db.js"
import { sendToS3, uploadImage } from "./controller.js";

const router = Router()

router.get("/my-tournaments", async (req, res) => {
    connectDb()

    try {
        const { _id: owner } = await JWTVerify(req)

        const items = await Tournament.find({ owner })
            .sort({ created_at: -1 })

        res.json(items)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Deu erro ao carregar os torneios', error })
    }
})

router.post("/", async (req, res) => {
    connectDb()

    const { title, description, coverImage } = req.body

    try {
        const { _id: owner } = await JWTVerify(req)

        const newTournamentDoc = await Tournament.create({
            owner, 
            title, 
            description, 
            coverImage
        })

        res.json(newTournamentDoc)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Deu erro ao criar um novo torneio', error })
    }
})

router.post("/upload", uploadImage().array("files", 1), async (req, res) => {
    const { files } = req

    const filesPromise = new Promise((resolve, reject) => {
        const fileURLArray = []

        files.forEach(async (file, index) => {
            const { filename, path, mimetype } = file

            try {
                const fileURL = await sendToS3(filename, path, mimetype)

                fileURLArray.push(fileURL)

                if (index === files.length - 1) resolve(fileURLArray)
            } catch (error) {
                console.error("Deu algum erro ao sair para o S3", error)
                reject(error)
            }
        })
    })

    const fileURLArrayResolved = await filesPromise

    res.json(fileURLArrayResolved)
})

router.delete("/", async (req, res) => {
    connectDb();

    const { tournamentId } = req.body;

    try {
        await Video.deleteMany({ owner: tournamentId });
        await Tournament.findOneAndDelete({ _id: tournamentId });

        res.json({ message: "Torneio excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover o torneio" });
    }
});

export default router