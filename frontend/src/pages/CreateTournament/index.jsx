import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx"
import { toast } from "react-toastify";

import FormTournamentCover from "../../components/FormTournamentCover/index.jsx";
import FormTournamentChoises from "../../components/FormTournamentChoises/index.jsx";
import FormTournamentHeader from "../../components/FormTournamentHeader/index.jsx";
import FormTournamentPublish from "../../components/FormTournamentPublish/index.jsx";

export default () => {
    const navigate = useNavigate()
    const { tournament_id } = useParams()

    const [selectStage, setSelectStage] = useState("cover")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [category, setCategory] = useState("")
    const [tournamentId, setTournamentId] = useState(null)

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

            if (tournament_id) {
                // Atualiza torneio existente
                await axios.put(`/tournaments/${tournament_id}`, {
                    title,
                    description,
                    coverImage
                })
                id = tournament_id
            } else {
                // Cria novo torneio
                const { data: createdTournament } = await axios.post('/tournaments', {
                    title,
                    description,
                    coverImage
                })
                id = createdTournament._id
            }

            navigate(`/create-tournament/${id}`)
            setSelectStage("choises")
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
        <div className="flex items-center py-8">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-8">
                <FormTournamentHeader selectStage={selectStage} setSelectStage={setSelectStage} />

                {selectStage === "cover" && (
                    <FormTournamentCover
                        tournament_id={tournament_id}
                        handleSubmit={handleSubmit}
                        title={title} setTitle={setTitle}
                        description={description} setDescription={setDescription}
                        coverImage={coverImage} setCoverImage={setCoverImage}
                    />
                )}

                {selectStage === "choises" && (
                    <FormTournamentChoises 
                        setSelectStage={setSelectStage} 
                        tournamentId={tournamentId || tournament_id} 
                    />
                )}

                {selectStage === "publish" && (
                    <FormTournamentPublish 
                        setSelectStage={setSelectStage} 
                        tournamentId={tournamentId || tournament_id}
                        category={category}
                        setCategory={setCategory}
                    />
                )}
            </div>
        </div>
    )
}