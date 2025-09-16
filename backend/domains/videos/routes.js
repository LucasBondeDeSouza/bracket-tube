import { Router } from "express";
import Video from "./model.js"
import axios from "axios";
import { connectDb } from "../../config/db.js";

const router = Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Função para extrair ID do YouTube
const extractVideoId = (link) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
};

router.post("/", async (req, res) => {
    connectDb()
    
    const { tournamentId, videoURL } = req.body;

    try {
        const video_id = extractVideoId(videoURL);
        if (!video_id) {
            return res.status(400).json({ error: "URL do YouTube inválida" });
        }

        // Buscar título do vídeo
        const ytRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${YOUTUBE_API_KEY}`
        );

        const title = ytRes.data.items[0]?.snippet?.title;
        if (!title) {
            title = "Título não encontrado"
        }

        const newVideoDoc = await Video.create({
            owner: tournamentId,
            title,
            video_id
        })

        res.json(newVideoDoc)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar título do vídeo" });
    }
});

router.get("/", async (req, res) => {
    connectDb()

    const { tournamentId } = req.query

    try {
        const items = await Video.find({ owner: tournamentId })
            .sort({ created_at: -1 })

        res.json(items)
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro ao buscar a lista de vídeos do torneio", error)
    }
})

router.delete("/", async (req, res) => {
    connectDb();

    const { videoId } = req.body;

    try {
        await Video.findOneAndDelete({ _id: videoId });

        res.json({ message: "Vídeo excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover o vídeo" });
    }
});

export default router;