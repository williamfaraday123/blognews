"use client"

import { useAuth } from "@/context/AuthContext";
import { useBlogContext } from "@/context/BlogContext";
import { useEffect, useState } from "react";

const blogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const { authenticated } = useAuth();
    const { blogsChanged } = useBlogContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
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
        <div>
            {blogs?.map((blog, index) => (
                <Card key={index} blog={blog} />
            ))}
        </div>
    )
};

export default blogsPage;