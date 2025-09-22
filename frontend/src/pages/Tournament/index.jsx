import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListVideosTournaments from "../../components/ListVideosTournaments";
import Play from "../Play"

export default () => {
    const { tournament_id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [startGame, setStartGame] = useState(true)

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const { data } = await axios.get(`/tournaments/${tournament_id}/videos`);
                setTournament(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTournament();
    }, [tournament_id]);

    if (!tournament) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col px-4 sm:px-8 py-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl md:text-5xl font-bold">{tournament.title}</h1>
                    <p className="text-lg md:text-xl text-gray-300">{tournament.description}</p>
                </div>

                <div className="mt-5 md:mt-0">
                    <button className="w-full bg-red-500 font-bold text-xl py-2 px-4 rounded-lg cursor-pointer">Jogar</button>
                </div>
            </div>

            <ListVideosTournaments videos={tournament.videos} edit={false} />

            {startGame && <Play tournament={tournament} />}
        </div>
    );
};