import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/Login";
import RegistrationPage from "./pages/Register/Register";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import AuthLayout from "./pages/Layout/AuthLayout";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

const App = () => {
    return (
        <Provider store={store}> {/* ✅ Provider corect */}
            <Router basename="/gabrielaraducan1606/proiect-individual-front-end">

                <Loader /> {/* ✅ Loader trebuie să fie în interior */}
                <Modal />  {/* ✅ Modal trebuie să fie în interior */}

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/diary" element={<PrivateRoute><AuthLayout><DiaryPage /></AuthLayout></PrivateRoute>} />
                    <Route path="/calculator" element={<PrivateRoute><AuthLayout><CalculatorPage /></AuthLayout></PrivateRoute>} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
