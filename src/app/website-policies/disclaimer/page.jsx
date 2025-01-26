"use client"

import Link from 'next/link';
import styles from './disclaimer.module.css';

const Disclaimer = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Disclaimer</h1>
            <div className={styles.description}>The information provided on mytravelblog is for general informational purposes only.</div>
            <ul className={styles.items}>
                <li className={styles.item}>
                    Accuracy: We make every effort to ensure the information on this site is accurate. However, we do not guarantee the accuracy, completeness, or reliability of any information.
                </li>
                <li className={styles.item}>
                    Travel Advice: Content on this site is not a substitute for professional travel advice. Always consult relevant authorities or experts before making travel arrangements.
                </li>
                <li className={styles.item}>
                    Third-Party Links: We are not responsible for the content or practices of external websites linked to from this site.
                </li>
                <li className={styles.item}>
                    User Responsibility: You are solely responsible for any decisions or actions taken based on the content provided on this site.
                </li>
            </ul>
            <div className={styles.description}>
                For any questions or concerns, please contact us at <Link href="/website-policies/contact" className={styles.link}>Contact Us</Link>
            </div>
        </div>
    );
};

export default Disclaimer;