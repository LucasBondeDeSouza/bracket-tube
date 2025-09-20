import React from "react"

export default ({ category, setCategory }) => {

    return (
        <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-lg border bg-zinc-800 px-3 py-2 text-sm shadow-sm 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        >
            <option value="Desconhecido">
                Selecione uma categoria
            </option>

            <option value="musica">Música</option>
            <option value="esportes">Esportes</option>
            <option value="filmes">Filmes e Séries</option>
            <option value="games">Games</option>
            <option value="comedia">Comédia</option>
            <option value="animacao">Animação</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="animais">Animais</option>
            <option value="outros">Outros</option>
        </select>
    )
}