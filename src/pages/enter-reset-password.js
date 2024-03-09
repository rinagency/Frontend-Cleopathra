import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo-icon-64.png';
import Switcher from "../components/switcher";
import { useResetPasswordMutation } from '../services/UserAuthApi';

const EnterResetPassword = () => {
  const params = useParams();
  const id = params.id;
  const token = params.token;
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(null); // Estado para indicar si la contraseña es segura

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handlePasswordInput = (e) => {
    const newPassword = e.target.value;
    const isSecure = newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) && /\d/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword);

    setPasswordSecure(isSecure ? 'La contraseña es segura.' : 'La contraseña no es segura. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Verificar longitud mínima de la contraseña y presencia de un carácter especial
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return;
    }

    // Hacer la llamada a la API
    const actualData = {
      id,
      token,
      actualData: {
        password: password,
        password2: password2,
      },
    };

    const res = await resetPassword(actualData);
    if (res.error) {
      setError('Hubo un error al restablecer la contraseña.');
    } else {
      setSuccess(true);
    }
  };

  // Redirigir a /reset-password-success si success es true
  if (success) {
    navigate('/new-password-success');
  }

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
                  <div className="mb-4 relative">
                    <label className="font-semibold" htmlFor="LoginPassword">Nueva Contraseña</label>
                    <input
                      id="Password"
                      type="password"
                      className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                      placeholder="Contraseña:"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onInput={handlePasswordInput}
                    />
                    {passwordSecure && (
                      <div className={`h-1 ${passwordSecure.includes('no es segura') ? 'bg-red-600' : 'bg-green-600'}`}></div>
                    )}
                  </div>
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="RepeatPassword">Repetir Contraseña</label>
                      <input
                        id="Password2"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Repite la contraseña:"
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

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">Contraseña restablecida con éxito.</p>}
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
