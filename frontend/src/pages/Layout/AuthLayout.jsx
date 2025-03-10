import React from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../components/Logo/Logo";
import Summary from "../../components/Summary/Summary";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles.authContainer}>
            <header className={styles.header}>
    <div className={styles.logo}>
        <Logo /> {/* Fără <Link> în jurul lui */}
    </div>
    <div className={styles.verticalBar}></div>
    <nav className={styles.nav}>
        <Link to="/diary" className={styles.navLink}>Diary</Link>
        <Link to="/calculator" className={styles.navLink}>Calculator</Link>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </nav>
</header>


            <div className={styles.mainContent}>
                {children}
                <Summary />
            </div>
        </div>
    );
};

export default AuthLayout;
