"use client"

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import styles from "./authLinks.module.css";

//uses the authContext to display appropriate links based on auth status
const AuthLinks = () => {
    const { authenticated, logout } = useAuth();

    return (
        <>
            {!authenticated ? (
                <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link href="/write">Write</Link>
                    <Link href="/my-blogs">My blogs</Link>
                    <span className={styles.link} onClick={logout}>Logout</span>
                </>
            )}
        </>
    );
};

export default AuthLinks;