import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/authSlice';
import { getToken, storeToken } from '../services/LocalStorageServices';
import { useLoginUserMutation } from '../services/UserAuthApi';
import logo from '../assets/images/logo-icon-64.png';
import Switcher from "../components/switcher";


const UserLogin = () => {
  const [serverError, setServerError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      // Verificar si los campos están vacíos
      if (!emailInput || !passwordInput || !emailInput.value || !passwordInput.value) {
          setServerError({ message: 'Por favor, completa todos los campos.' });
          return;
      }

      const actualData = {
          email: emailInput.value,
          password: passwordInput.value,
          remember_me: rememberMe,
      };

      const res = await loginUser(actualData);
      if (res.error) {
          setServerError(res.error.data.errors);
      }
      if (res.data) {
          storeToken(res.data.token);
          let { access_token } = getToken();
          dispatch(setUserToken({ access_token: access_token }));
          navigate('/dashboard');
      }
  }

    let { access_token } = getToken()
    useEffect(() => {
      dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])

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

                <h5 className="mt-6 text-xl font-semibold">Inicia sesión con tu cuenta</h5>

                <form className="text-start mt-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginEmail">Correo electrónico:</label>
                      <input id="email" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="nombre@ejemplo.com"/>
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginPassword">Contraseña:</label>
                      <input id="password" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" placeholder="Contraseña:"/>
                    </div>
                    {serverError.message && <p className="text-red-600 text-center mb-4">{serverError.message}</p>}
                    <div className="flex justify-between mb-4">
                    <div className="flex items-center mb-0">
                    <input
                      className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-amber-400 focus:border-amber-300 focus:ring focus:ring-offset-0 focus:ring-amber-200 focus:ring-opacity-50 cursor-pointer me-2"
                      type="checkbox"
                      value=""
                      id="RememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-checkbox-label text-slate-400 cursor-pointer" htmlFor="RememberMe">Recuérdame</label>
                  </div>
                      <p className="text-slate-400 mb-0"><Link to="/reset-password" className="text-slate-400">¿Olvidó la contraseña?</Link></p>
                    </div>

                    <div className="mb-4">
                      <input type="submit" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full" value="Iniciar Sesión"/>
                    </div>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">¿No tienes una cuenta?</span> <Link to="/signup" className="text-slate-900 dark:text-white font-bold inline-block">Regístrate</Link>
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

export default UserLogin;