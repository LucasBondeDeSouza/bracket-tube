import React from "react";

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

export default ({ tournaments, profile=False, handleDelete }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-6">
            {tournaments.map((item, index) => (
                <div className="flex flex-col cursor-pointer relative">
                    <div 
                        key={index} 
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
                        <h1 className="text-2xl line-clamp-1">{item.title}</h1>
                        <p className="text-sm text-gray-300 line-clamp-1">{item.description}</p>
                    </div>

                    {profile && (
                        <div className="absolute top-1 right-1 flex gap-2">
                            <button 
                                title="Editar" 
                                className="bg-blue-600 rounded-full p-2 cursor-pointer"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>

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