import React, { useState } from "react";
import axios from "axios"
import { useUserContext } from "../../context/UserContext.jsx"

import { toast } from "react-toastify";
import FormTournamentCover from "../../components/FormTournamentCover/index.jsx";
import FormTournamentChoises from "../../components/FormTournamentChoises/index.jsx";
import FormTournamentHeader from "../../components/FormTournamentHeader/index.jsx";

export default () => {
    const { user } = useUserContext()
    const [selectStage, setSelectStage] = useState("choises")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [tournamentId, setTournamentId] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const newTournament = await axios.post('/tournaments', {
                title,
                description,
                coverImage
            })

            const createdTournament = res.data
            const id = createdTournament._id

            setTournamentId(id)
            setSelectStage("choises")

            toast.success("Torneio criado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        } catch (error) {
            console.error(JSON.stringify(error))
            toast.error("Deu erro ao criar um novo torneio", {
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
                        title={title} setTitle={setTitle}
                        description={description} setDescription={setDescription}
                        coverImage={coverImage} setCoverImage={setCoverImage}
                    />
                )}

                {selectStage === "choises" && (
                    <FormTournamentChoises tournamentId={tournamentId}  />
                )}
            </div>
        </div>
    )
}