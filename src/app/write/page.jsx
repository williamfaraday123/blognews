"use client"

import categories from "@/components/categoryList/categoryList.json";
import Location from "@/components/location";
import { useAuth } from "@/context/AuthContext";
import { useBlogContext } from "@/context/BlogContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./write.module.css";

const Write = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        images: [],
        description: '',
        location: null
    });

    const handleChange = (e, field) => {
        if (field == 'images') {
            const files = Array.from(e.target.files);
            const readers = files.map((file) => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(readers).then((results) => {
                setFormData((prevData) => ({
                    ...prevData,
                    [field]: [...prevData.images, ...results]
                }));
            });
        } else if (field == 'location') {
            setFormData((prevData) => ({
                ...prevData,
                [field]: e,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: e.target.value
            }));
        }
    };

    const { authenticated } = useAuth();
    const { toggleBlogsList } = useBlogContext();
    const router = useRouter();
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
                router.push('/');
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
                <option value='' disabled hidden>Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <div className={styles.editor}>
                <input
                    type="file"
                    multiple
                    onChange={(e) => handleChange(e, 'images')}
                    className={styles.file}
                />
                <textarea
                    placeholder="Tell your story..."
                    value={formData.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className={styles.input}
                />
                <Location selectedSearchOption={formData.location} setSelectedSearchOption={(e) => handleChange(e, 'location')} />
                <button className={styles.button} onClick={handleSubmit}>Publish</button>
            </div>
        </div>
    );
};

export default Write;