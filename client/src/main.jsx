import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Header from './components/Header/Header';
import Translator from './components/TranslatorFolder/Translator';
import History from './components/History/History';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Team from './components/About/Team';
import LetsTranslate from './components/LetsTranslate/LetsTranslateMain';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LetsTranslate />} />
        <Route path="/translatorapp" element={<Translator />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/team" element={<Team />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
