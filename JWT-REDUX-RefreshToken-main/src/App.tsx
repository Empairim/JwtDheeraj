import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";

import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import Layout from './components/CommonLayout'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <CssBaseline/>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Layout/>}>
            {/* Privare and public routes  */}
            {/* Roles in my CRM  ROle Based Routing */}
            <Route path="profile" element={<ProfilePage/>}></Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="verifyemail">
          <Route path=":verificationCode" />
        </Route>
      </Routes>
      </>
  );
}

export default App;
