"use client"

import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {

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
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/register', formData);
            console.log(res.data);
            alert(`formData posted successfully, ${JSON.stringify(res.data.message)}`);
        } catch (err) {
            alert(`Error posting formData, ${err}`);
        }
    };

    return (
        <div>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field}</label>
                    <input
                        value={formData[field]}
                        onChange={(e) => handleChange(e, field)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>register</button>
        </div>
    );
};

export default RegisterPage;