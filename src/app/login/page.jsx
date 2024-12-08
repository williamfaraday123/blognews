"use client"
import axios from 'axios';
import { useState } from 'react';
import styles from "./loginPage.module.css";

const LoginPage = () => {
    const fields = ["username", "password"];
    const [formData, setFormData] = useState(() => {
        let initialFormData = {};
        fields.forEach((field) => {
            initialFormData[field] = '';
        });
        return initialFormData;
    });
    const handleChange = (e, field) => {
        setFormData((prevFields) => ({
            ...prevFields,
            [field]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/login', formData);
            console.log(res.data);
            alert(`formData posted successfully, ${JSON.stringify(res?.data?.message)}`);
        } catch (error) {
            alert('Error posting formData', error);
        }
    };
    return (
        <div className={styles.container}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field}</label>
                    <input
                        value={formData[field]}
                        onChange={(e) => {handleChange(e, field)}}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default LoginPage;