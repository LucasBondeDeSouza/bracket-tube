import React, { useState, useEffect } from "react"

// Embaralhar array
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Criar confrontos (pares)
function createMatches(videos) {
    const matches = [];
    for (let i = 0; i < videos.length; i += 2) {
        matches.push({
            id: i / 2,
            home: videos[i],
            away: videos[i + 1] || null,
        });
    }
    return matches;
}

export default ({ videos, currentMatch, setCurrentMatch, matches, setMatches }) => {
    const [round, setRound] = useState(1);
    const [winners, setWinners] = useState([]);
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [bothAction, setBothAction] = useState(null);

    useEffect(() => {
        const shuffled = shuffleArray([...videos]);
        setMatches(createMatches(shuffled));
        setCurrentMatch(0);
        setWinners([]);
        setSelectedWinner(null);
    }, [videos]);

    function nextStep(updatedWinners) {
        setSelectedWinner(null); // resetar animação
        if (currentMatch < matches.length - 1) {
            setWinners(updatedWinners);
            setCurrentMatch(currentMatch + 1);
        } else {
            if (updatedWinners.length === 1) {
                alert("🏆 Campeão: " + updatedWinners[0].title);
            } else if (updatedWinners.length === 0) {
                alert("⚠️ Nenhum vencedor nesta rodada!");
            } else {
                const next = createMatches(updatedWinners);
                setMatches(next);
                setRound(r => r + 1);
                setCurrentMatch(0);
                setWinners([]);
            }
        }
    }

    function handleWinner(winner) {
        setSelectedWinner(winner); // iniciar animação
        setTimeout(() => nextStep([...winners, winner]), 800); // esperar animação antes de avançar
    }

    function handleEliminateBoth() {
        setBothAction("eliminate");
        setTimeout(() => {
            nextStep([...winners]);
            setBothAction(null);
        }, 800);
    }

    function handleClassifyBoth() {
        const both = [];
        if (match.home) both.push(match.home);
        if (match.away) both.push(match.away);
        setBothAction("classify");
        setTimeout(() => {
            nextStep([...winners, ...both]);
            setBothAction(null);
        }, 800);
    }

    const getBothClass = () => {
        if (bothAction === "classify") return "rounded-xl border-4 border-green-400 transition-transform duration-700";
        if (bothAction === "eliminate") return "rounded-xl border-4 border-red-500 transition-transform duration-700";
        return "";
    };

    const getWinnerClass = (video) => 
        selectedWinner && selectedWinner === video
            ? "rounded-xl scale-110 border-4 border-green-400 transition-transform duration-700"
            : "";

    const getLoserClass = (video) =>
        selectedWinner && selectedWinner !== video
            ? "rounded-xl scale-95 border-4 border-red-500 transition-transform duration-700"
            : "";

    if (!matches.length) return <p>Carregando torneio...</p>;

    const match = matches[currentMatch];

    return (
        <>
            <div className="flex flex-col md:flex-row w-full md:gap-3 gap-5 items-center justify-center relative md:px-10 cursor-pointer">
                {/* Vídeo 1 */}
                {match.home && (
                    <div className={`flex flex-col gap-2 w-full md:w-1/2 h-[250px] md:h-[350px] hover:scale-105 transition ${getWinnerClass(match.home)} ${getLoserClass(match.home)} ${getBothClass()}`}>
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${match.home.video_id}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                            title={match.home.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />

                        <div
                            onClick={() => handleWinner(match.home)}
                            className="min-h-10 flex items-center justify-center p-2 bg-blue-500 rounded-md cursor-pointer"
                        >
                            <span title={match.home.title} className="text-lg line-clamp-1 text-white">
                                {match.home.title}
                            </span>
                        </div>
                    </div>
                )}

                {/* Vídeo 2 */}
                {match.away && (
                    <div className={`flex flex-col gap-2 w-full md:w-1/2 h-[250px] md:h-[350px] hover:scale-105 transition ${getWinnerClass(match.away)} ${getLoserClass(match.away)} ${getBothClass()}`}>
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${match.away.video_id}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                            title={match.away.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />

                        <div
                            onClick={() => handleWinner(match.away)}
                            className="min-h-10 flex items-center justify-center p-2 bg-red-500 rounded-md cursor-pointer"
                        >
                            <span title={match.away.title} className="text-lg line-clamp-1 text-white">
                                {match.away.title}
                            </span>
                        </div>
                    </div>
                )}

                <div className="absolute text-8xl font-extrabold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse">
                    <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">V</span>
                    <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]">S</span>
                </div>
            </div>

            <div className="w-full flex gap-2 mt-8 md:px-10">
                <button onClick={handleEliminateBoth} className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition cursor-pointer">
                    Eliminar os dois
                </button>
                <button onClick={handleClassifyBoth} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition cursor-pointer">
                    Classificar os dois
                </button>
            </div>
        </>
    );
};