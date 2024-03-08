import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../services/UserAuthApi"; // Importa el hook de la API
import logo from '../assets/images/logo-icon-64.png';
import Switcher from "../components/switcher";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState({});
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation(); // Usa el hook de la API correspondiente
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el campo de correo electrónico está vacío
    if (!email) {
      setServerError({ message: 'Por favor, ingresa tu correo electrónico.' });
      return;
    }

    try {
      const res = await sendPasswordResetEmail({ email });
      if (res.error) {
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        // Puedes manejar el éxito según tus necesidades (por ejemplo, redirigir a una página de confirmación)
        navigate('/reset-password-success');
      }
    } catch (error) {
      console.error('Error en la solicitud de reseteo de contraseña:', error);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden h-screen flex items-center  bg-[url('../../assets/images/bg/bg-ai.jpg')] bg-no-repeat bg-left bg-cover bg-fixed">
        <div className="absolute inset-0 "></div>
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-1/3 md:w-2/4 shadow-md dark:shadow-gray-800">
              <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                <Link to="/">
                  <img src={logo} alt="" className="mx-auto mb-4" />
                </Link>

                <h5 className="mt-6 text-xl font-semibold">Olvidé la contraseña</h5>

                <p className="text-slate-400 mt-2">
                  Por favor, introduzca su dirección de correo electrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico.
                </p>

                <form className="text-start mt-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginEmail">
                        Correo electrónico:
                      </label>
                      <input
                        id="LoginEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="nombre@ejemplo.com"
                      />
                    </div>

                    {serverError.message && (
                      <p className="text-red-600 text-center mb-4">{serverError.message}</p>
                    )}

                    <div className="mb-4">
                      <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full"
                        value="Enviar"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">Recordó la contraseña? </span>{' '}
                      <Link to="/login" className="text-slate-900 dark:text-white font-bold inline-block">
                        Iniciar Sesión
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
    </>
  );
}