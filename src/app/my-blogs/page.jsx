"use client"

import Card from "@/components/card/Card";
import { useAuth } from "@/context/AuthContext";
import { useBlogContext } from "@/context/BlogContext";
import { useEffect, useState } from "react";
import styles from './blogsPage.module.css';

const blogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const { authenticated } = useAuth();
    const { blogsChanged } = useBlogContext();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`/api/blog/read?username=${token}`);
            if (!response.ok) {
                throw error;
            }
            const data = await response.json();
            setBlogs(data);
        }
        if (authenticated)
            fetchBlogs();
    }, [blogsChanged]);
    
    return (
        <div className={styles.container}>
            <p className={styles.title}>Blogs by {token}</p>
            <div className={styles.blogs}>
                {blogs?.map((blog, index) => (
                    <Card key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
};

export default blogsPage;