import { Router } from "express";
import Tournament from "./model.js"
import Video from "../videos/model.js"
import { JWTVerify } from "../../utils/jwt.js"
import { connectDb } from "../../config/db.js"
import { sendToS3, uploadImage } from "./controller.js";

const router = Router()

router.get("/", async (req, res) => {
    connectDb()

    try {
        const items = await Tournament.find()
            .sort({ created_at: -1 })

        res.json(items)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Deu erro ao carregar os torneios', error })
    }
})

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

    const { title, description, coverImage, category } = req.body

    try {
        const { _id: owner } = await JWTVerify(req)

        const newTournamentDoc = await Tournament.create({
            owner, 
            title, 
            description, 
            coverImage,
            category
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

// Buscar um torneio específico pelo ID
router.get("/:id", async (req, res) => {
    connectDb();

    const { id } = req.params;

    try {
        const { _id: owner } = await JWTVerify(req);

        const tournament = await Tournament.findOne({ _id: id, owner });
        if (!tournament) {
            return res.status(404).json({ message: "Torneio não encontrado" });
        }

        res.json(tournament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar torneio", error });
    }
});

// Atualizar um torneio existente
router.put("/:id", async (req, res) => {
    connectDb();

    const { id } = req.params;
    const { title, description, coverImage, category } = req.body;

    try {
        const { _id: owner } = await JWTVerify(req);

        const updatedTournament = await Tournament.findOneAndUpdate(
            { _id: id, owner },
            { title, description, coverImage, category },
            { new: true }
        );

        if (!updatedTournament) {
            return res.status(404).json({ message: "Torneio não encontrado ou você não tem permissão" });
        }

        res.json(updatedTournament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar torneio", error });
    }
});

router.get("/:id/videos", async (req, res) => {
    connectDb()
    const { id } = req.params;

    try {
        const { _id: owner } = await JWTVerify(req);

        // Garante que o torneio existe
        const tournament = await Tournament.findOne({ _id: id, owner });
        if (!tournament) {
            return res.status(404).json({ message: "Torneio não encontrado" });
        }

        // Busca os vídeos relacionados ao torneio
        const videos = await Video.find({ owner: id });

        // Monta a resposta
        const response = {
            _id: tournament._id,
            title: tournament.title,
            description: tournament.description,
            videos
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar vídeos do torneio", error });
    }
});

export default router