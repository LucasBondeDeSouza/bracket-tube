import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx"
import { toast } from "react-toastify";

import Header from "../../components/Header";
import FormTournamentCover from "../../components/FormTournamentCover/index.jsx";
import FormTournamentAddVideos from "../../components/FormTournamentAddVideos/index.jsx";
import FormTournamentHeader from "../../components/FormTournamentHeader/index.jsx";

export default () => {
    const { user } = useUserContext()
    const navigate = useNavigate()
    const { tournament_id } = useParams()

    const [selectStage, setSelectStage] = useState("create-tournament")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [category, setCategory] = useState("")
    const [tournamentId, setTournamentId] = useState(null)

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Quando estiver editando, buscar os dados atuais do torneio
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const { data } = await axios.get(`/tournaments/${tournament_id}`)
                setTitle(data.title)
                setDescription(data.description)
                setCoverImage(data.coverImage)
                setCategory(data.category)
                setTournamentId(data._id)
            } catch (error) {
                console.error(error)
                toast.error("Erro ao carregar torneio existente", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark"
                })
            }
        }

        if (tournament_id) fetchTournament()
    }, [tournament_id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let id

            if (category == "") {
                toast.error("Por favor, selecione uma categoria!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark"
                });
                return;
            }

            if (tournament_id) {
                // Atualiza torneio existente
                await axios.put(`/tournaments/${tournament_id}`, {
                    title,
                    description,
                    coverImage,
                    category
                })
                id = tournament_id
            } else {
                // Cria novo torneio
                const { data: createdTournament } = await axios.post('/tournaments', {
                    title,
                    description,
                    coverImage,
                    category
                })
                id = createdTournament._id
            }

            navigate(`/create-tournament/${id}`)
            setSelectStage("add-videos")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao salvar os dados do torneio", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    return (
        <>
            <Header />
            
            <div className="flex items-center py-8">
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-8">
                    <FormTournamentHeader tournamentId={tournamentId || tournament_id}  selectStage={selectStage} setSelectStage={setSelectStage} />

                    {selectStage === "create-tournament" && (
                        <FormTournamentCover
                            tournament_id={tournament_id}
                            handleSubmit={handleSubmit}
                            title={title} setTitle={setTitle}
                            description={description} setDescription={setDescription}
                            coverImage={coverImage} setCoverImage={setCoverImage}
                            category={category} setCategory={setCategory}
                        />
                    )}

                    {selectStage === "add-videos" && (
                        <FormTournamentAddVideos 
                            setSelectStage={setSelectStage} 
                            tournamentId={tournamentId || tournament_id} 
                        />
                    )}
                </div>
            </div>
        </>
    )
}