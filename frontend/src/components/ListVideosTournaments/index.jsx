import React from "react";
import axios from "axios";
import { TrashIcon } from '@heroicons/react/24/solid'

import { toast } from "react-toastify";

export default ({ videos, setVideos, edit }) => {

    const handleDelete = async (videoId) => {
        try {
            await axios.delete("/videos", { data: { videoId } });

            setVideos(prev => prev.filter(video => video._id !== videoId));
        } catch (error) {
            toast.error("Erro ao excluir o vídeo", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
            {videos.map(video => (
                <div 
                    key={video._id} 
                    className="relative w-full rounded-lg"
                >
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.video_id}`}
                        title={video.title}
                        frameBorder="0"
                        allowFullScreen
                        ></iframe>
                    </div>
                    <p className="mt-2 font-semibold">{video.title}</p>

                    {edit && (
                        <div className="absolute right-1 top-1">
                            <button 
                                title="Excluir" 
                                className="bg-red-600 rounded-full p-2 cursor-pointer"
                                onClick={() => handleDelete(video._id)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}