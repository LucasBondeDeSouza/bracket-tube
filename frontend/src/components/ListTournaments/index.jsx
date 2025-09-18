import React from "react";

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom";

export default ({ tournaments, profile=false, handleDelete }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-10">
            {tournaments.map((item, index) => (
                <div key={index} className="flex flex-col cursor-pointer relative">
                    <div
                        className={`${!item.coverImage && "bg-zinc-700"} w-full h-50 bg-cover bg-center rounded-t-lg`}
                        style={{
                            backgroundImage: `url(${item.coverImage})`
                        }}
                    >
                        {!item.coverImage && (
                            <p className="text-center">Sem Imagem</p>
                        )}
                    </div>

                    <div className="rounded-b-lg flex flex-col bg-zinc-800 px-3 py-2">
                        <p className="text-end text-gray-300 capitalize">{item.category}</p>
                        <h1 className="text-2xl line-clamp-1">{item.title}</h1>
                        <p className="text-sm text-gray-300 line-clamp-1">{item.description}</p>
                    </div>

                    {profile && (
                        <div className="absolute top-1 right-1 flex gap-2">
                            <Link 
                                to={`/create-tournament/${item._id}`}
                                title="Editar" 
                                className="bg-blue-600 rounded-full p-2 cursor-pointer"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </Link>

                            <button 
                                title="Excluir" 
                                className="bg-red-600 rounded-full p-2 cursor-pointer"
                                onClick={() => handleDelete(item._id)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}