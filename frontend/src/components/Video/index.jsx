import React, { useState } from "react";

export default () => {
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState(null);

    const extractVideoId = (link) => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        return match ? match[1] : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
        } else {
            alert("URL inválida do YouTube!");
        }
    };

    console.log(videoId)

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Cole o link do YouTube"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 w-full rounded mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Carregar Vídeo
                </button>
            </form>

            {videoId && (
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    )
}