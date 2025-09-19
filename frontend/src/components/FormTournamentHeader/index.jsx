import React from "react";

export default ({ tournamentId, selectStage, setSelectStage }) => {

    return (
        <div className="flex gap-3 mb-10 text-xl">
            <span 
                onClick={() => tournamentId && setSelectStage("cover")}
                className={`${selectStage == "cover" && "text-red-500"} cursor-pointer`}>
                    Capa
            </span>

            <span>|</span>
            
            <span 
                onClick={() => tournamentId && setSelectStage("choises")}
                className={`${selectStage == "choises" && "text-red-500"} cursor-pointer`}>
                    Adicionar Vídeos
            </span>

            <span>|</span>

            <span 
                onClick={() => tournamentId && setSelectStage("category")}
                className={`${selectStage == "category" && "text-red-500"} cursor-pointer`}>
                    Categoria
            </span>
        </div>
    )
}