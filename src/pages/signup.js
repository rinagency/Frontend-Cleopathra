import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo-icon-64.png'
import Switcher from "../components/switcher";
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/UserAuthApi'
import { storeToken } from '../services/LocalStorageServices';

const Registration = () => {
    const [serverError, setServerError] = useState({ message: '' });
    const [passwordSecure, setPasswordSecure] = useState(null); // null indica estado inicial
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handlePasswordInput = (e) => {
        const newPassword = e.target.value;
        const isSecure = newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) && /\d/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword);
        
        // Actualizar el estado y el mensaje dinámico
        setPasswordSecure(isSecure ? 'La contraseña es segura.' : 'La contraseña no es segura. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const tc = document.getElementById('tc').checked;

        // Verificar si los campos están vacíos
        if (!name || !email || !password || !password2) {
            setServerError({ message: 'Por favor, completa todos los campos.' });
            return;
        }

        // Verificar si las contraseñas coinciden
        if (password !== password2) {
            setServerError({ message: 'Las contraseñas no coinciden.' });
            return;
        }

        // Verificar si se aceptaron los términos y condiciones
        if (!tc) {
            setServerError({ message: 'Debes aceptar los términos y condiciones.' });
            return;
        }

        // Verificar longitud mínima de la contraseña y presencia de un carácter especial
        if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setServerError({ message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.' });
            return;
        }

        const res = await registerUser({ name, email, password, password2, tc });

        if (res.error && res.error.data && res.error.data.errors) {
            const serverErrors = res.error.data.errors;

            // Verificar si hay un error específico de correo electrónico duplicado
            if (serverErrors.email && serverErrors.email.length > 0) {
            const errorMessage = (
                <p>
                Ya hay una cuenta con este correo electrónico.{' '}
                <span>
                    <Link to="/login" className="text-amber-400">Inicia sesión</Link> o{' '}
                    <Link to="/reset-password" className="text-amber-400">Restablece la contraseña</Link>.
                </span>
                </p>
            );

            setServerError({ message: errorMessage });
            } else {
            setServerError(serverErrors);
            }
        }

        if (res.data) {
            console.log(typeof (res.data))
            console.log(res.data)
            storeToken(res.data.token);
            navigate('/success-register');
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
                                        <label className="font-semibold" htmlFor="RegisterName">Nombre completo:</label>
                                        <input id="name" type="text" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="Tu nombre:"/>
                                    </div>
    
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Correo electrónico:</label>
                                        <input id="email" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="nombre@ejemplo.com"/>
                                        <input id="email" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="nombre@ejemplo.com"/>
                                    </div>
    
                                    <div className="mb-4 relative">
                                        <label className="font-semibold" htmlFor="LoginPassword">Contraseña:</label>
                                        <input
                                            id="password"
                                            type="password"
                                            onInput={handlePasswordInput}
                                            className={`form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0`}
                                            placeholder="Contraseña:"
                                        />
                                        {passwordSecure && (
                                            <div className={`absolute bottom-0 left-0 w-full h-1 ${passwordSecure.includes('no es segura') ? 'bg-red-600' : 'bg-green-600'} mb-4`} style={{ marginBottom: "10px" }}></div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                    <label className="font-semibold" htmlFor="LoginPassword2">Repite la contraseña: </label>
                                    <input id="password2" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="Password:"/>
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
