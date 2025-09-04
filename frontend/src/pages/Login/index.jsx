import React, { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <section className="flex items-center my-8">
            <div className="mx-auto max-w-96 flex flex-col items-center gap-4 w-full">
                <h1 className="text-3xl font-bold">Faça seu login</h1>

                <form className="flex flex-col gap-2 w-full">
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
                        Login
                    </button>
                </form>

                <p>Ainda não tem uma conta? <Link to={'/register'} className="underline font-semibold">Registre-se aqui!</Link></p>
            </div>
        </section>
    )
}