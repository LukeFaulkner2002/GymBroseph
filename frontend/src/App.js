import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import QuestionarrePage from './pages/QuestionarrePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/register" index element={<RegisterPage />} />
      <Route path="/home" index element={<HomePage />} />
      <Route path="/questionarre" index element={<QuestionarrePage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;