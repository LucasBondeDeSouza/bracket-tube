import React from "react";

export default ({ tournament }) => {
    console.log(tournament);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative h-screen w-full px-5 py-10 bg-zinc-900 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center mb-5">
                    <h1 className="text-3xl font-bold line-clamp-1">
                        {tournament.title}
                    </h1>
                    <p className="text-gray-300 line-clamp-1">
                        {tournament.description}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row w-full md:gap-3 gap-5 items-center justify-center relative md:px-10 cursor-pointer">
                    {/* Vídeo 1 */}
                    <div className="flex flex-col gap-2 w-full md:w-1/2 h-[250px] md:h-[350px] transform transition-transform duration-300 hover:scale-105">
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${tournament.videos[2].video_id}`}
                            title={tournament.videos[2].title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>

                        <div className="min-h-10 flex items-center justify-center p-1 bg-blue-500 rounded-md">
                            <span className="text-lg line-clamp-1 md:line-clamp-2">
                                {tournament.videos[2].title}
                            </span>
                        </div>
                    </div>

                    {/* Vídeo 2 */}
                    <div className="flex flex-col gap-2 w-full md:w-1/2 h-[250px] md:h-[350px] transform transition-transform duration-300 hover:scale-105">
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${tournament.videos[1].video_id}`}
                            title={tournament.videos[1].title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>

                        <div className="min-h-10 flex items-center justify-center p-2 bg-red-500 rounded-md">
                            <span className="text-lg line-clamp-1 md:line-clamp-2">
                                {tournament.videos[1].title}
                            </span>
                        </div>
                    </div>

                    {/* VS no centro */}
                    <div className="absolute text-8xl font-extrabold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse">
                        <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">V</span>
                        <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]">S</span>
                    </div>
                </div>

                {/* Botões abaixo */}
                <div className="flex items-start gap-2 mt-8">
                    <button
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                    >
                        Eliminar os dois
                    </button>
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
                    >
                        Classificar os dois
                    </button>
                </div>

                <div className="absolute top-5 left-5">Back</div>
            </div>
        </div>
    );
};