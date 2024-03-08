import './assets/css/tailwind.css'
import './assets/css/materialdesignicons.min.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Helpcenter from './pages/helpcenter';
import Login from './pages/login';
import Signup from './pages/signup';
import ResetPassword from './pages/reset-password';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Error from './pages/error';
import Dashboard from "./pages/dashboard"
import { useSelector } from "react-redux";
import SuccessSendReset from './pages/reset-password-success';
import EnterResetPassword from './pages/enter-reset-password';
import SuccessRegister from './pages/success-register';

const App = () => {
  const { access_token, rememberMe } = useSelector((state) => state.auth);
  return (
    <Router>
    <Routes>
      <Route path="/" element={rememberMe ? <Navigate to="/dashboard" /> : <Login />}/>
      <Route path='/api/user/reset/:uid/:token' element={<EnterResetPassword />} />
      <Route path='/reset-password-success' element={<SuccessSendReset/>} />
      <Route path='/success-register' element={<SuccessRegister/>} />
      <Route path='/helpcenter' element={<Helpcenter/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route path='/terms' element={<Terms/>} />
      <Route path='/privacy' element={<Privacy/>} />
      <Route path='/error' element={<Error/>} />
      <Route path='*' element={<Error/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </Router>
  );
}

export default App;
