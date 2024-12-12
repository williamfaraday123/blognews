"use client"

import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from "./registerPage.module.css";

const RegisterPage = () => {

    const fields = ["username", "password"];

    const [formData, setFormData] = useState(() => {
        let initialFormData = {};
        fields.forEach((field) => {
            initialFormData[field] = '';
        });
        return initialFormData;
    });

    const router = useRouter();

    const handleChange = (e, field) => {
        setFormData((prevFields) => ({
            ...prevFields,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/register', formData);
            console.log(res.data);
            alert(`formData posted successfully, ${JSON.stringify(res.data.message)}`);
            router.push('/login');
        } catch (err) {
            alert(`Error posting formData, ${err}`);
        }
    };

    return (
        <div className={styles.container}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label className={styles.label}>{field}</label>
                    <input
                        value={formData[field]}
                        onChange={(e) => handleChange(e, field)}
                        className={styles.input}
                    />
                </div>
            ))}
            <button onClick={handleSubmit} className={styles.button}>register</button>
        </div>
    );
};

export default RegisterPage;