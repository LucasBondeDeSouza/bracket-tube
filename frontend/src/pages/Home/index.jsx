import React, { useState, useEffect } from "react";
import axios from "axios"

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ListTournaments from "../../components/ListTournaments";
import SelectCategory from "../../components/SelectCategory";

export default () => {
    const [category, setCategory] = useState("")
    const [tournaments, setTournaments] = useState([])
    const [search, setSearch] = useState("")
    
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

    const filteredTournaments = tournaments.filter(t => {
        const matchesSearch = t.title?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category && category !== "Desconhecido" ? t.category === category : true;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col px-4 sm:px-8 py-8 max-w-7xl mx-auto">
            <div className="w-full flex items-center justify-between gap-4">
                <div className="basis-1/2 sm:basis-auto sm:w-auto">
                    <SelectCategory category={category} setCategory={setCategory} />
                </div>

                <div className="basis-1/2 sm:flex-1 flex items-center py-2 px-4 rounded-md ring cursor-pointer">
                    <MagnifyingGlassIcon className="size-5" />
                    <input
                        type="text"
                        value={search}
                        placeholder="Procurar..."
                        className="outline-none ml-4 w-full"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <ListTournaments tournaments={filteredTournaments} />
        </div>
    )
}