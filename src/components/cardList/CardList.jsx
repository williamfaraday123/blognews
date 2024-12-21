"use client"

import { useBlogContext } from "@/context/BlogContext";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./cardList.module.css";

const CardList = ({ selectedCategory }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blogsChanged } = useBlogContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const encodedCategory = encodeURIComponent(selectedCategory); //encode before sending in URL to ensure spaces and special characters are properly handled
                
                const response = await fetch(`/api/blog/read?category=${encodedCategory}`);
                if (!response.ok) {
                    throw error;
                }
                const rows = await response.json();
                setBlogs(rows);
                setLoading(false);
            } catch (error) {
                alert(`Error in fetching blogs ${error}`);
            }
        }

        if (selectedCategory)
            fetchBlogs();
    }, [selectedCategory, blogsChanged]);

    if (loading) {
        return <div>Loading CardList...</div>;
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{selectedCategory}</h1>
            <div className={styles.posts}>
                {blogs.map((blog, index) => (
                    <Card
                        key={index}
                        blog={blog}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;