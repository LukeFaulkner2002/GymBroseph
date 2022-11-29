import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import QuestionarrePage from './pages/QuestionarrePage';
import SearchPage from './pages/SearchPage';
import MusclePage from './pages/MusclePage';
import PasswordPage from './pages/PasswordPage';
import ResetPage from './pages/ResetPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/register" index element={<RegisterPage />} />
      <Route path="/home" index element={<HomePage />} />
      <Route path="/questionarre" index element={<QuestionarrePage />} />
      <Route path="/search" index element={<SearchPage />} />
      <Route path="/muscles" index element={<MusclePage />} />
      <Route path="/password" index element={<PasswordPage />} />
      <Route path="/reset" index element={<ResetPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;