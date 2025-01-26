"use client"

import styles from './about.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.description}>Welcome to mytravelblog!</p>
            <p className={styles.description}>At mytravelblog, we are passionate about exploring the world and sharing incredible travel experiences with our readers. Our blog is dedicated to providing inspiring stories, travel guides, tips, and insights to make your adventures unforgettable.</p>
            <p className={styles.description}>Whether you're a seasoned traveler or planning your first trip, we aim to be your trusted companion, offering valuable advice and destination recommendations. Our mission is to ignite your wanderlust and help you uncover hidden gems, explore diverse cultures, and create lasting memories wherever you go.</p>
            <p className={styles.description}>We believe travel has the power to transform lives, broaden perspectives, and connect people across the globe. Through our engaging content, we hope to inspire you to step out of your comfort zone and embark on your next adventure.</p>
            <p className={styles.description}>Thank you for being a part of our journey. Happy travels!</p>
        </div>
    );
};

export default About;