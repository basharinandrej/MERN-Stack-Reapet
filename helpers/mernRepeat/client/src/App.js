import './App.css';
import React from "react";
import Routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import AuthHook from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const {token, logout, login, userId} = AuthHook()
    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{
            login, logout, token, userId
        }}>
            <BrowserRouter>
                {isAuthenticated && <NavBar />}
                <Routes isAuthenticated={ isAuthenticated } />
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
