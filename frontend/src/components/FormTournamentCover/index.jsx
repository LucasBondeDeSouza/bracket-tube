import React from "react";
import axios from "axios"
import { ArrowUpTrayIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";

export default ({ handleSubmit, title, setTitle, description, setDescription, coverImage, setCoverImage }) => {

    const uploadCoverImage = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("files", file)

        try {
            const { data } = await axios.post("/tournaments/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setCoverImage(data[0])
            toast.success("Upload feito com sucesso", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        } catch (error) {
            toast.error("Deu erro na hora do upload", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    return (
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
                    className="rounded-lg border h-52 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden"
                >
                    <input type="file" id="file" className="hidden" accept="image/*" onChange={uploadCoverImage} />

                    {/* Preview da imagem */}
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt="Preview da capa"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <>
                            <ArrowUpTrayIcon className="h-8 w-8" />
                            <span className="text-sm">Enviar Imagem</span>
                        </>
                    )}
                </label>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center gap-3 rounded-lg bg-red-500 text-white font-bold px-6 py-2 cursor-pointer">
                    Adicionar Vídeos
                    <ArrowRightIcon className="size-5" />
                </button>
            </div>
        </form>
    )
}