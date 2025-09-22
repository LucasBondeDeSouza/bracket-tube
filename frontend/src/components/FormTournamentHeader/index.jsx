import React from "react";

export default ({ tournamentId, selectStage, setSelectStage }) => {

    return (
        <div className="flex gap-3 mb-10 text-xl">
            <span 
                onClick={() => tournamentId && setSelectStage("create-tournament")}
                className={`${selectStage == "create-tournament" && "text-red-500"} cursor-pointer`}>
                    Criar Torneio
            </span>

            <span>|</span>
            
            <span 
                onClick={() => tournamentId && setSelectStage("add-videos")}
                className={`${selectStage == "add-videos" && "text-red-500"} cursor-pointer`}>
                    Adicionar Vídeos
            </span>
        </div>
    )
}