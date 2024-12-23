import React from "react";
import "./App.css";
import Redirect from "./routing/routers";
import Header from "./shared/layout/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <div className="root">
                <Header/>
                <div className="wrapper">
                    <Redirect/>
                </div>
                {/*<Footer/>*/}
            </div>

            <ToastContainer/>
        </>
    );
};
export default App;
