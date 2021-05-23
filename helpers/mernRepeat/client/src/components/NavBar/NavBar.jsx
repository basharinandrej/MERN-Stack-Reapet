import React, {useContext} from "react";
import './NavBar.css'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const NavBar = () => {
    const {logout} = useContext(AuthContext)
    const logoutHandler = () => logout()

    return (
        <div className="nav-bar">
            <ul className="nav-bar__list">
                <NavLink to="/create"> Create </NavLink>
                <NavLink to="/links"> Links </NavLink>
            </ul>

            <span className="logout" onClick={logoutHandler}>Выйти</span>
        </div>
    )
}

export default NavBar
