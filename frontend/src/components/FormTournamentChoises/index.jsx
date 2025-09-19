import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ListVideosTournaments from "../ListVideosTournaments";
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

export default ({ setSelectStage, tournamentId }) => {
    const [videoURL, setVideoURL] = useState("");
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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
            setVideoURL("");
            return;
        }

        try {
            await axios.post("/videos", { tournamentId, videoURL });
            setVideoURL("");

            toast.success("Vídeo adicionado com sucesso", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });

            fetchVideos();
        } catch (error) {
            toast.error("Erro ao adicionar o vídeo", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    useEffect(() => {
        if (tournamentId) {
            fetchVideos();
        }
    }, [tournamentId]);


    // Lista filtrada de vídeos
    const filteredVideos = videos.filter((video) =>
        video.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-96 flex flex-col justify-between">
            <div className="flex flex-col gap-9">
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

                            <button className="rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </form>

                <div className="flex flex-col gap-2">
                    <label htmlFor="search" className="text-2xl font-bold">Buscar</label>
                        
                    <input
                        id="search"
                        type="text"
                        placeholder="Buscar pelo título do vídeo"
                        className="w-full rounded-lg border px-4 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <ListVideosTournaments videos={filteredVideos} setVideos={setVideos} />

            <div className="flex justify-between">
                <button onClick={() => setSelectStage("cover") } className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    <ArrowLeftIcon className="size-5" />
                    Capa
                </button>

                <button onClick={() => setSelectStage("category") } className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    Categoria
                    <ArrowRightIcon className="size-5" />
                </button>
            </div>
        </div>
    );
};