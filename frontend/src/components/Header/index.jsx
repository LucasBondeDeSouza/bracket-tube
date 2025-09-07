import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid'

import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";

export default () => {
    const { user, setUser } = useUserContext()
    const [redirect, setRedirect] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate()

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = async () => {
        try {
            await axios.post("/users/logout")
            setUser(null)
            navigate("/")
        } catch (error) {
            toast.error(JSON.stringify(error), {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    return (
        <header className="shadow-md">
            <div className="flex items-center justify-between px-4 sm:px-8 py-2 max-w-7xl mx-auto">
                
                {/* Logo */}
                <Link to={'/'} className="flex items-center text-white text-2xl font-bold">
                    <p>Bracket</p>
                    <span className="text-red-500">Tube</span>
                </Link>

                {/* Botão usuário + dropdown */}
                <div className="relative" ref={menuRef}>
                    <Link
                        to={!user && "/login"}
                        onClick={() => user && setIsOpen(!isOpen)}
                        className="flex items-center border ring pr-4 pl-6 py-2 rounded-full gap-2 shadow-md cursor-pointer text-white transition"
                    >
                        <Bars3Icon className="size-5" />
                        <UserCircleIcon className="size-8" />
                        {user && <p className="max-w-20 sm:max-w-32 truncate">{user.name}</p>}
                    </Link>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden">
                            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer">
                                Perfil
                            </button>

                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-800 cursor-pointer">
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}