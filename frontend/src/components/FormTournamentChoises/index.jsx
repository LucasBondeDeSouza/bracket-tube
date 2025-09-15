import React, { useState } from "react";
import axios from "axios"

export default ({ tournamentId }) => {
    const [videoURL, setVideoURL] = useState("")
    const [videoId, setVideoId] = useState(null)

    const extractVideoId = (link) => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        return match ? match[1] : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(videoURL);
        if (id) {
            setVideoId(id);
        } else {
            alert("URL inválida do YouTube!");
        }
    };

    console.log(videoId)

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
        </div>
    )
}