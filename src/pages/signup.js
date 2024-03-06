import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo-icon-64.png'
import Switcher from "../components/switcher";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/UserAuthApi'
import { storeToken } from '../services/LocalStorageServices';

const Registration = () => {
    const [serverError, setServerError] = useState({});
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actualData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password2: document.getElementById('password2').value,
            tc: document.getElementById('tc').checked,
        }

        // Verificar si los campos están vacíos
        if (!actualData.name || !actualData.email || !actualData.password || !actualData.password2) {
            setServerError({ message: 'Por favor, completa todos los campos.' });
            return;
        }

        const res = await registerUser(actualData);
        if (res.error) {
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            console.log(typeof (res.data))
            console.log(res.data)
            storeToken(res.data.token);
            navigate('/dashboard');
        }
    }
    return(
        <>
        <section className="relative overflow-hidden h-screen flex items-center bg-[url('../../assets/images/bg/bg-ai.jpg')] bg-no-repeat bg-left bg-cover bg-fixed">
            <div className="absolute inset-0 "></div>
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="lg:w-1/3 md:w-2/4 shadow-md dark:shadow-gray-800">
                        <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                            <Link to="/">
                                <img src={logo} alt="" className="mx-auto mb-4" />
                            </Link>

                            <h5 className="mt-6 text-xl font-semibold">Crea una cuenta</h5>

                            <form className="text-start mt-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="RegisterName">Tu nombre:</label>
                                        <input id="name" type="text" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="Nombre completo"/>
                                    </div>
    
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Correo electrónico:</label>
                                        <input id="email" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="nombre@ejemplo.com"/>
                                    </div>
    
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Contraseña:</label>
                                        <input id="password" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="Mínimo 8 caracteres"/>
                                    </div>
    
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword2">Repite la contraseña:</label>
                                        <input id="password2" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder=""/>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center w-full mb-0">
                                            <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-amber-400 focus:border-amber-300 focus:ring focus:ring-offset-0 focus:ring-amber-200 focus:ring-opacity-50 me-2 cursor-pointer" type="checkbox" value={true} id="tc"/>
                                            <label className="form-check-label text-slate-400 cursor-pointer" htmlFor="AcceptT&C">Acepto <Link to="" className="text-amber-400"> Terminos y condiciones</Link></label>
                                        </div>
                                    </div>
                                    {serverError.message && <p className="text-red-600 text-center mb-4">{serverError.message}</p>}
    
                                    <div className="mb-4">
                                        <input type="submit" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full" value="Registrarme"/>
                                    </div>
    
                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">¿Tienes una cuenta? </span> <Link to="/login" className="text-slate-900 dark:text-white font-bold inline-block">Iniciar sesión</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Switcher/>
        </>
    )
}
export default Registration;
