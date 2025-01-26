"use client"

import styles from './terms-and-conditions.module.css';

const TermsAndConditions = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms and Conditions</h1>
            <div className={styles.description}>Effective Date: 26/01/2025</div>
            <div className={styles.description}>Welcome to mytravelblog. By accessing or using our website, you agree to be bound by these Terms and Conditions.</div>
            <div>
                <h2 className={styles.subtitle}>Use of the Website</h2>
                <ul className={styles.items}>
                    <li className={styles.item}>You agree not to use the website for any unlawful or prohibited activities.</li>
                    <li className={styles.item}>You are responsible for the accuracy of the information you provide.</li>
                    <li className={styles.item}>Using the website for hate speech is prohibited. Violating content will be taken down.</li>
                </ul>
            </div>
            <div>
                <h2 className={styles.subtitle}>Intellectual Property</h2>
                <div className={styles.description}>All content on this website, including text, images, and graphics, is the property of [My Travel Blog] and is protected by copyright laws. You may not reproduce or distribute any content without prior written permission.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Disclaimer of Warranties</h2>
                <div className={styles.description}>This website is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Limitation of Liability</h2>
                <div className={styles.description}>We shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Changes to Terms</h2>
                <div className={styles.description}>We reserve the right to update these Terms and Conditions at any time. Continued use of the website constitutes your acceptance of the updated terms.</div>
            </div>
        </div>
    );
};

export default TermsAndConditions;