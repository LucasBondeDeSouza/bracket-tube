import React, { useEffect, useState } from "react";
import axios from "axios"

import { toast } from "react-toastify";

import Header from "../../components/Header";
import ListTournaments from "../../components/ListTournaments";
import PageLoader from "../PageLoader";

export default () => {
    const [tournaments, setTournaments] = useState([])
    const [loading, setLoading] = useState(true);

    const fecthMyTournaments = async () => {
        try {
            const res = await axios.get("/tournaments/my-tournaments")

            setTournaments(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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

    if (loading) return <PageLoader />;

    return (
        <>
            <Header />
            
            <div className="flex flex-col px-4 sm:px-8 py-8 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-3xl font-bold">Meus Torneios</h1>

                <ListTournaments 
                    tournaments={tournaments} 
                    profile={true} 
                    handleDelete={handleDelete}
                />
            </div>
        </>
    )
}