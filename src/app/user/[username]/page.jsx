"use client"

import Card from "@/components/card/Card";
import { useBlogContext } from "@/context/BlogContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './blogsPage.module.css';

const Page = () => {
    const params = useParams();
    const username = params.username;
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blogsChanged } = useBlogContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`/api/blog/read?username=${username}`);
                if (!response.ok) {
                    throw error;
                }
                const data = await response.json();
                setBlogs(data);
                setLoading(false);
            } catch (err) {
                alert(`Error fetching blogs: ${err.message}`);
            }
        }
        if (username)
            fetchBlogs();
    }, [username, blogsChanged]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>Blogs by {username}</p>
            <div className={styles.blogs}>
                {blogs?.map((blog, index) => (
                    <Card key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
};

export default Page;