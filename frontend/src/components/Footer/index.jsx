import React from "react"
import { FaGithub, FaLinkedin, FaFolder } from "react-icons/fa";

export default () => {

    return (
        <footer className="bg-[#111]">
            <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-between px-4 sm:px-8 py-5 sm:py-8 max-w-7xl mx-auto">
                <p className="text-gray-300 font-semibold">&copy; 2025 Lucas Bonde</p>

                <div className="flex gap-5">
                    <a href="https://www.linkedin.com/in/lucasbonde/" target="_blank">
                        <FaLinkedin title="Linkedin" className="text-2xl text-gray-300 hover:text-white transition" />
                    </a>
                    <a href="https://github.com/LucasBondeDeSouza" target="_blank">
                        <FaGithub title="Github" className="text-2xl text-gray-300 hover:text-white transition" />
                    </a>
                    <a href="https://lucasbonde.vercel.app/" target="_blank">
                        <FaFolder title="Portfólio" className="text-2xl text-gray-300 hover:text-white transition" />
                    </a>
                </div>
            </div>
        </footer>
    )
}