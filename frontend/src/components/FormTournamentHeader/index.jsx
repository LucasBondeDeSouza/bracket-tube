import React from "react";

export default ({ selectStage, setSelectStage }) => {

    return (
        <div className="flex gap-3 mb-10 text-xl">
            <span 
                className={`${selectStage == "cover" && "text-red-500"}`}>
                    Cover
            </span>

            <span>|</span>
            
            <span 
                className={`${selectStage == "choises" && "text-red-500"}`}>
                    Incluir Vídeos
            </span>

            <span>|</span>

            <span 
                className={`${selectStage == "publish" && "text-red-500"}`}>
                    Publicar
            </span>
        </div>
    )
}