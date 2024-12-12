"use client"

import { useAuth } from "@/context/AuthContext";
import { useBlogContext } from "@/context/BlogContext";
import axios from "axios";
import { useState } from "react";
import styles from "./write.module.css";

const Write = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: null,
        description: '',
    });

    const handleChange = (e, field) => {
        if (field == 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [field]: reader.result
                }));
            };
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: e.target.value
            }));
        }
    };

    const { authenticated } = useAuth();
    const { toggleBlogsList } = useBlogContext();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authenticated) {
            try {
                const token = localStorage.getItem('token');
                const formDataToSend = {
                    ...formData,
                    username: token
                };
                console.log(formDataToSend);
                const res = await axios.post('/api/blog/create', formDataToSend);
                alert(`Blog posted successfully, ${res.data.message}`);
                toggleBlogsList();
            } catch (err) {
                alert(`Error posting blog, ${err}`);
            }
        } else {
            alert('Not logged in');
        }
    };

    return (
        <div className={styles.container}>
            <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleChange(e, 'title')}
                className={styles.input}
            />
            <select
                value={formData.category}
                onChange={(e) => handleChange(e, 'category')}
                className={styles.input}
            >
                {["style", "fashion", "food", "travel"].map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <div className={styles.editor}>
                <input
                    type="file"
                    onChange={(e) => handleChange(e, 'image')}
                    className={styles.file}
                />
                <textarea
                    placeholder="Tell your story..."
                    value={formData.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className={styles.input}
                />
                <button className={styles.button} onClick={handleSubmit}>Publish</button>
            </div>
        </div>
    );
};

export default Write;