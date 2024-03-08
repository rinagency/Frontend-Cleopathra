import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userAuthApi } from "../services/UserAuthApi";
import logo from '../assets/images/logo-icon-64.png';
import Switcher from "../components/switcher";

const EnterResetPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  // Accede directamente a resetPassword desde userAuthApi
  const resetPasswordMutation = userAuthApi.useResetPasswordMutation;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password1 !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    try {
      const response = await resetPasswordMutation({
        actualData: {
          new_password1: password1,
          new_password2: password2,
        },
        id: uid,
        token,
      });
  
      // Verificar si la respuesta tiene errores de validación
      if (response.error) {
        setError(response.error.message); // O ajusta según la estructura del error
        return;
      }
  
      navigate("/reset-password-success");
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden h-screen flex items-center bg-[url('../../assets/images/bg/bg-ai.jpg')] bg-no-repeat bg-left bg-cover bg-fixed">
        <div className="absolute inset-0 bg-slate-950/20"></div>
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-1/3 md:w-2/4">
              <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                <Link to="/">
                  <img src={logo} alt="" className="mx-auto mb-4" />
                </Link>

                <h5 className="mt-6 text-xl font-semibold">Restablecer contraseña</h5>

                <p className="text-slate-400 mt-2">Escriba su nueva contraseña</p>

                <form className="text-start mt-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginPassword">Nueva Contraseña</label>
                      <input
                        id="Password1"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Password:"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="RepeatPassword">Repetir Contraseña</label>
                      <input
                        id="Password2"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Password:"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full"
                        value="Enviar"
                      />
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
};
export default EnterResetPassword;