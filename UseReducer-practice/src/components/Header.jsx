import React from 'react'
import classes from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/" activeClassName={classes.active}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ViewUserInfo" activeClassName={classes.active}>
                        View User
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header
