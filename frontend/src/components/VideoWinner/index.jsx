import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default ({ title, tournament_id, setShowVideoWinner, winner, runnerUp }) => {
    const navigate = useNavigate()
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                navigate(`/tournament/${tournament_id}`)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setShowVideoWinner])

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-[#111] rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto"
            >
                <div className="p-4 flex items-start justify-between"> 
                    <h2 className="text-white text-3xl font-bold">{title}</h2>
                    <button 
                        onClick={() => navigate(`/tournament/${tournament_id}`)} 
                        className="text-white hover:text-gray-300 cursor-pointer"
                    >
                        ✕ 
                    </button> 
                </div>

                <div className="p-4 flex flex-col gap-4 items-center">
                    <div className="relative flex gap-5">
                        <div className="w-1/2 flex flex-col items-center">
                            <img 
                                src={`https://img.youtube.com/vi/${winner.video_id}/hqdefault.jpg`} 
                                alt={winner.title} 
                                className="w-full rounded-lg shadow-lg ring-4 ring-yellow-400 ring-offset-2"
                            />
                            <p className="text-white text-sm font-bold mt-2">{winner.title}</p>
                        </div>

                        <div className="w-1/2 flex flex-col items-center">
                            <img 
                                src={`https://img.youtube.com/vi/${runnerUp.video_id}/hqdefault.jpg`} 
                                alt={runnerUp.title} 
                                className="w-full rounded-lg shadow-lg bg-cover bg-center brightness-25"
                            />
                            <p className="text-white text-sm font-bold mt-2">{runnerUp.title}</p>
                        </div>

                        <div className="absolute text-4xl md:text-8xl font-extrabold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="text-blue-500">V</span>
                            <span className="text-red-500">S</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}