import React, { useState, useEffect } from "react";
import axios from "axios"

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ListTournaments from "../../components/ListTournaments";

export default () => {
    const [tournaments, setTournaments] = useState([])
    
    const fecthTournaments = async () => {
        try {
            const res = await axios.get("/tournaments")

            setTournaments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fecthTournaments()
    }, [])

    return (
        <div className="flex flex-col px-4 sm:px-8 py-8 max-w-7xl mx-auto">
            <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 ring py-2 px-4 rounded-md cursor-pointer">
                    <p>Selecionar Categoria</p>
                    <ChevronDownIcon className="size-5" />
                </div>

                <div className="flex items-center py-2 px-4 rounded-md ring cursor-pointer">
                    <MagnifyingGlassIcon className="size-5" />
                    <input 
                        type="text"
                        placeholder="Procurar..."
                        className="outline-none ml-4" 
                    />
                </div>
            </div>

            <ListTournaments tournaments={tournaments} />
        </div>
    )
}