"use client"

import categories from "@/components/categoryList/categoryList.json";
import Comments from "@/components/comments/Comments";
import Likes from "@/components/likes";
import { useBlogContext } from "@/context/BlogContext";
import axios from "axios";
import { useState } from "react";
import styles from "./card.module.css";

const Card = ({ blog }) => {
    const [viewDescription, setViewDescription] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: blog?.title,
        category: blog?.category,
        description: blog?.description,
        image: blog?.image
    });

    const { toggleBlogsList } = useBlogContext();
    const toggleViewDescription = () => {
        setViewDescription(prevState => !prevState);
    };
    const toggleViewComments = () => {
        setViewComments(prevState => !prevState);
    };
    const toggleEditing = () => {
        setEditing(prevState => !prevState);
    };

    const handleChange = (e, field) => {
        if (field === 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEditFormData((prevData) => ({
                    ...prevData,
                    [field]: reader.result
                }));
            };
        } else {
            setEditFormData((prevFields) => ({
                ...prevFields,
                [field]: e.target.value
            }));
        }
    };

    const token = localStorage.getItem('token');
    const deleteBlog = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                BlogID: blog.id,
                username: token
            };
            const res = await axios.post(`/api/blog/delete`, formData);
            alert(`Blog deleted successfully, ${res.data.message}`);
            toggleBlogsList();
        } catch (error) {
            alert(`Error in deleting blog, ${error}`)
        }
    };
    const updateBlog = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                BlogID: blog.id,
                username: token,
                ...editFormData
            };
            const res = await axios.post("/api/blog/update", formData);
            alert(`Blog updated successfully, ${res.data.message}`);
            toggleBlogsList();
        } catch (error) {
            alert(`Error in updating blog, ${error}`);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    src={blog?.image}
                    alt=""
                    className={styles.image}
                />
            </div>
            <div className={styles.textContainer}>
                <span className={styles.category}>{blog?.category}</span>
                <h3 className={styles.postTitle}>{blog?.title}</h3>
                <div className={styles.detail}>
                    <span className={styles.username}>{blog?.username}</span>
                    <span className={styles.date}>{blog?.publishDate}</span>
                </div>
                <Likes BlogID={blog?.id} />
                <div>
                    <button onClick={toggleViewDescription} className={styles.button}>Read More</button>
                    {viewDescription && (
                        <div>{blog?.description}</div>
                    )}
                </div>
                <div>
                    <button onClick={toggleViewComments} className={styles.button}>Comments</button>
                    {viewComments && (
                        <Comments BlogID={blog?.id} />
                    )}
                </div>
                <div>
                    {token === blog?.username && (
                        <>
                            <button onClick={deleteBlog} className={styles.button}>delete</button>
                            <button onClick={toggleEditing} className={styles.button}>edit</button>
                        </>
                    )}
                </div>
                <div>
                    {editing && (
                        <div className={styles.editForm}>
                            <div>
                                <label>title</label>
                                <input
                                    value={editFormData.title}
                                    onChange={(e) => handleChange(e, 'title')}
                                    className={styles.input}
                                />
                            </div>
                            <div>
                                <label>category</label>
                                <select
                                    value={editFormData.category}
                                    onChange={(e) => handleChange(e, 'category')}
                                    className={styles.input}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>image</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleChange(e, 'image')}
                                />
                            </div>
                            <div>
                                <label>description</label>
                                <textarea
                                    value={editFormData.description}
                                    onChange={(e) => handleChange(e, 'description')}
                                    className={styles.input}
                                />
                                <button onClick={updateBlog} className={styles.button}>Save</button>
                                <button onClick={toggleEditing} className={styles.button}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;