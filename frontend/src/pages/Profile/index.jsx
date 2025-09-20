import React, { useEffect, useState } from "react";
import axios from "axios"

import ListTournaments from "../../components/ListTournaments";

export default () => {
    const [tournaments, setTournaments] = useState([])

    const fecthMyTournaments = async () => {
        try {
            const res = await axios.get("/tournaments/my-tournaments")

            setTournaments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (tournamentId) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir este torneio?");
        if (!confirmed) return;
        
        try {
            await axios.delete("/tournaments", { data: { tournamentId } });
            
            setTournaments(prev => prev.filter(tournaments => tournaments._id !== tournamentId));

            toast.success("Torneio excluido com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        } catch (error) {
            toast.error("Erro ao excluir o Torneio", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    useEffect(() => {
        fecthMyTournaments()
    }, [])

    return (
        <div className="flex items-center py-8">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-8">
                <h1 className="text-3xl font-bold">Meus Torneios</h1>

                <ListTournaments 
                    tournaments={tournaments} 
                    profile={true} 
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    )
}