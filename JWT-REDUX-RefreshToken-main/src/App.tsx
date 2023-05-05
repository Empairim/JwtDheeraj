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
import ProfilePage from "./pages/profile.page";
import RequireUser from "./components/Barrier";

function App() {
  return (
    <>
    <CssBaseline/>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Layout/>}>
            {/* Privare and public routes  */}
            {/* Roles in my CRM  ROle Based Routing // authorization and authentication */}
            <Route element={<RequireUser allowedRoles={['admin','user']}/>}>

            </Route>
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
