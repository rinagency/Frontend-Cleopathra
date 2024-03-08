import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo-icon-64.png';
import Switcher from "../components/switcher";

export default function SuccessRegister() {
    return (
        <>
            <section className="relative overflow-hidden h-screen flex items-center bg-[url('../../assets/images/bg/bg-ai.jpg')] bg-no-repeat bg-left bg-cover bg-fixed">
                <div className="absolute inset-0"></div>
                <div className="container relative">
                    <div className="md:flex justify-center">
                        <div className="lg:w-1/3 md:w-2/4 shadow-md dark:shadow-gray-800 flex flex-col items-center">
                            <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                                <Link to="/">
                                    <img src={logo} alt="" className="mx-auto mb-4" />
                                </Link>

                                <h5 className="text-xl font-semibold text-center mb-2">Se ha registrado correctamente</h5>

                                <p className="text-slate-400 mt-2">¡Bienvenido a Cleopath-ra!. Estamos emocionados de que seas parte de nosotros.</p>

                                <div className="mb-4">
                                    <Link to="/login" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full">
                                        Iniciar Sesión
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    )
}
