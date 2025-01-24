"use client"

import { useBlogContext } from "@/context/BlogContext";
import { useLocationContext } from "@/context/LocationContext";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./menuPosts.module.css";

const MenuPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { blogsChanged } = useBlogContext();
    const { locationFilters } = useLocationContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const locationFiltersParams = new URLSearchParams(locationFilters).toString();
                const response = await fetch(`/api/blog/read?${locationFiltersParams}`);
                if (!response.ok) {
                    throw error;
                }
                const rows = await response.json();
                setBlogs(rows);
                console.log(blogs);
            } catch (err) {
                alert(`Cannot fetch blogs: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [blogsChanged, locationFilters]);

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