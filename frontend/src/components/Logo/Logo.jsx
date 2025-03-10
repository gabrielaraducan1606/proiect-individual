import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Importăm SVG-ul
import styles from "./Logo.module.css"; // Importăm CSS Modules

const Logo = () => {
    return (
        <Link to="/" className={styles.logoContainer}> {/* ✅ Transformăm logo-ul în link */}
            <img src={logo} alt="Health App Logo" className={styles.logo} />
        </Link>
    );
};

export default Logo;
