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
                    <Link href="/login" className={styles.link}>Login</Link>
                    <Link href="/register" className={styles.link}>Register</Link>
                </>
            ) : (
                <>
                    <Link href="/write" className={styles.link}>Write</Link>
                    <Link href="/my-blogs" className={styles.link}>My blogs</Link>
                    <span onClick={logout} className={styles.link}>Logout</span>
                </>
            )}
        </>
    );
};

export default AuthLinks;