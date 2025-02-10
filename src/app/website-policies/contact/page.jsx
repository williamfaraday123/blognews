"use client"

import { useState } from 'react';
import styles from './contact.module.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
            alert('Email sent successfully!');
        } catch (error) {
            alert(`An error occurred while sending the email. ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.description}>We’d love to hear from you! Whether you have a question, feedback, or encounter any problems with the website, feel free to get in touch with us.</p>
            <div>
                <h2 className={styles.subtitle}>Contact Information:</h2>
                <ul className={styles.items}>
                    <li className={styles.item}>
                        <a href="mailto:isaa0015@e.ntu.edu.sg" className={styles.link}>Email</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className={styles.subtitle}>Message Us:</h2>
                <div className={styles.description}>Alternatively, you can use our contact form to send us a message directly:</div>
                <div>
                    Your Name:
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div>
                    Your Email:
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div>
                    Your Message:
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={styles.input}
                    ></textarea>
                </div>
                <button onClick={handleSubmit} className={styles.button}>Submit</button>
            </div>
        </div>
    );
};

export default Contact;
