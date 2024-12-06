"use client"

import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
    const context = useContext(ThemeContext);
    console.log("ThemeContext value in ThemeProvider:", context); // Debug log

    const { theme } = context || {}; // Ensure context is not null/undefined
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div className={theme}>
            {children}
        </div>
    );
};

export default ThemeProvider;