import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";

import SelectCategory from "../SelectCategory"

export default ({ setSelectStage, tournamentId, category, setCategory }) => {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (category == "Desconhecido") {
            toast.error("Por favor, selecione uma categoria!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
            return;
        }

        try {
            await axios.put(`/tournaments/category/${tournamentId}`, {
                category
            });

            toast.success("Alterações feitas com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });

            navigate("/profile")
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="h-96 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-3xl font-bold">Categoria</label>
                
                <div className="flex gap-2">
                    <SelectCategory category={category} setCategory={setCategory} />
                </div>
            </div>

            <div className="flex justify-between">
                <button onClick={() => setSelectStage("choises") } className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    <ArrowLeftIcon className="size-5" />
                    Adicionar Vídeos
                </button>

                <button type="submit" className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    Publicar
                </button>
            </div>
        </form>
    )
}