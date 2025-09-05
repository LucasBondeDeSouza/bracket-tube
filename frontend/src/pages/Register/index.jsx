import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default ({ setUser }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data: userDoc } = await axios.post("/users/login", {
                email,
                password
            })

            setUser(userDoc)
            setRedirect(true)
        } catch (err) {
            alert(`Deu um erro ao logar: ${err.response.data}`)
        }
    }

    if (redirect) return <Navigate to="/" />

    return (
        <section className="flex items-center my-8">
            <div className="mx-auto max-w-96 flex flex-col items-center gap-4 w-full">
                <h1 className="text-3xl font-bold">Faça seu cadastro</h1>

                <form  className="flex flex-col gap-2 w-full">
                    <input 
                        type="text"
                        className="w-full rounded-lg border px-4 py-2"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                        type="email"
                        className="w-full rounded-lg border px-4 py-2"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password"
                        className="w-full rounded-lg border px-4 py-2"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="w-full rounded-lg bg-red-500 font-bold px-4 py-2 cursor-pointer">
                        Registrar
                    </button>
                </form>

                <p>Já tem uma conta? <Link to={'/login'} className="underline font-semibold">Logue aqui!</Link></p>
            </div>
        </section>
    )
}