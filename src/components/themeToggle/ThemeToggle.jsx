"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import styles from "./themeToggle.module.css";

const ThemeToggle = () => {

    const context = useContext(ThemeContext);
    if (!context) {
        console.error("ThemeContext is null or undefined in ThemeToggle.");
        return null; // Prevent rendering if context is unavailable
    }
    console.log("ThemeContext value in ThemeProvider:", context); // Debug log

    const { theme, toggle } = context || {}; // Ensure context is not null/undefined
    return (
        <div className={styles.container} onClick={toggle}>
            {theme === "light" ? "dark mode" : "light mode"}
        </div>
    );
};

export default ThemeToggle;