import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import TournamentBracket from "../../components/TournamentBracket"
import Footer from "../../components/Footer"
import PageLoader from "../PageLoader";

export default () => {
    const { tournament_id } = useParams();
    const navigate = useNavigate()
    const [tournament, setTournament] = useState(null);
    const [currentMatch, setCurrentMatch] = useState(0);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const { data } = await axios.get(`/tournaments/${tournament_id}/videos`);
                setTournament(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };

        fetchTournament();
    }, [tournament_id]);

    if (loading) return <PageLoader />;

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="relative min-h-screen w-full px-5 py-10 bg-zinc-900 flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center mb-2">
                        <h1 className="text-4xl font-bold line-clamp-1">
                            {tournament.title}
                        </h1>

                        <p className="text-gray-400 line-clamp-2 md:line-clamp-1">
                            {tournament.description}
                        </p>

                        <p className="font-bold text-xl">
                            {currentMatch + 1} / {matches.length}
                        </p>
                    </div>

                    <TournamentBracket 
                        title={tournament.title}
                        videos={tournament.videos} 
                        currentMatch={currentMatch}
                        setCurrentMatch={setCurrentMatch} 
                        matches={matches}
                        setMatches={setMatches}
                    />

                    <div 
                        onClick={() => navigate(`/tournament/${tournament._id}`)} 
                        className="absolute top-2 lg:top-5 left-2 lg:left-5 cursor-pointer"
                    >
                        <ArrowLeftIcon className="size-7" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};