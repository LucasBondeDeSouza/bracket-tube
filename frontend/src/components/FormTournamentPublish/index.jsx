import React from "react";

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

export default ({ setSelectStage, tournamentId }) => {
    
    return (
        <div className="flex flex-col justify-between">
            <div className="">

            </div>

            <div className="">
                <button onClick={() => setSelectStage("publish") } className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    <ArrowLeftIcon className="size-4" />
                    Publicar
                </button>
            </div>
        </div>
    )
}