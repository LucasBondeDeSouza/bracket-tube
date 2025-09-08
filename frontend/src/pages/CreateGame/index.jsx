import React, { useState } from "react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import axios from "axios"

export default () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // const newTournament = await axios.post('/tournaments', {

        // })
    }

    return (
        <div className="flex items-center py-8">
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-3xl font-bold">Título</label>
                        
                        <input
                            id="title"
                            type="text"
                            placeholder="título"
                            className="w-full rounded-lg border px-4 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-3xl font-bold">Descrição</label>
                        
                        <textarea
                            id="description"
                            placeholder="descrição"
                            className="w-full rounded-lg border px-4 py-2 h-20 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-3xl font-bold">Imagem de Capa</label>

                        <label
                            htmlFor="file"
                            className="rounded-lg border h-52 flex flex-col items-center justify-center gap-2 cursor-pointer"
                        >
                            <input type="file" id="file" className="hidden" />
                            
                            <ArrowUpTrayIcon className="size-15" />
                            <span className="text-sm">Enviar Imagem</span>
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button className="rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}