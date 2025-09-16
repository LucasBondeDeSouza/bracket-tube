import React, { useEffect, useState } from "react";
import axios from "axios"

import { toast } from "react-toastify";
import ListVideosTournaments from "../ListVideosTournaments";

export default ({ tournamentId }) => {
    const [videoURL, setVideoURL] = useState("")
    const [videos, setVideos] = useState([])
    
    const extractVideoId = (link) => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        return match ? match[1] : null;
    };

    const fetchVideos = async () => {
        try {
            const res = await axios.get("/videos", {
                params: { tournamentId }
            });
            setVideos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = extractVideoId(videoURL);

        if (!id) {
            toast.error("URL Inválida!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
            setVideoURL("")
        } 

        try {
            await axios.post("/videos", { tournamentId, videoURL });
            setVideoURL("");

            toast.success("Vídeo incluido com sucesso", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });

            fetchVideos();
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-3xl font-bold">URL do YouTube</label>
                    
                    <div className="flex gap-2">
                            <input
                            id="title"
                            type="text"
                            placeholder="URL do YouTube"
                            className="w-full rounded-lg border px-4 py-2"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                            required
                        />

                        <button className="rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">Adicionar</button>
                    </div>
                </div>
            </form>

            <ListVideosTournaments videos={videos} setVideos={setVideos} />
        </div>
    )
}