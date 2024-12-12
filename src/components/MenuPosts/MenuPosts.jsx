"use client"

import { useBlogContext } from "@/context/BlogContext";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./menuPosts.module.css";

const MenuPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { blogsChanged } = useBlogContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blog/read");
                if (!response.ok) {
                    throw error;
                }
                const rows = await response.json();
                setBlogs(rows);
            } catch (err) {
                alert(`Cannot fetch blogs: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [blogsChanged]);

    if (loading) {
        return <div>Loading MenuPosts...</div>;
    }
    return (
        <div className={styles.items}>
            {blogs.map((blog, index) => (
                <div key={index} className={styles.item}>
                    <Card
                        blog={blog}
                    />
                </div>
            ))}
        </div>
    );
};

export default MenuPosts;