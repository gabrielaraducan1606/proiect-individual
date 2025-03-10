import React from "react";
import Summary from "../Summary/Summary";
import styles from "./RightSideBar.module.css";

const RightSidebar = () => {
    return (
        <aside className={styles.rightSidebar}>
            <Summary />
        </aside>
    );
};

export default RightSidebar;
