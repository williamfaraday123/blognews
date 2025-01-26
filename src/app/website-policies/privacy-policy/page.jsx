"use client"

import Link from 'next/link';
import styles from './privacy-policy.module.css';

const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <div className={styles.description}>Effective Date: 26/01/2025</div>
            <div className={styles.description}>Welcome to mytravelblog("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.</div>
            <div>
                <h2 className={styles.subtitle}>Information We Collect</h2>
                <div className={styles.description}>We may collect personal information that you voluntarily provide to us, including but not limited to:</div>
                <ul className={styles.items}>
                    <li className={styles.item}>Your name, email address, and other contact information when subscribing to our newsletter or filling out forms.</li>
                    <li className={styles.item}>Comments or messages you post on our blog.</li>
                </ul>
                <div className={styles.description}>Additionally, we may automatically collect non-personal information such as:</div>
                <ul className={styles.items}>
                    <li className={styles.item}>Your IP address, browser type, and operating system.</li>
                    <li className={styles.item}>Pages you visit on our site and the time spent on each page.</li>
                </ul>
            </div>
            <div>
                <h2 className={styles.subtitle}>How We Use Your Information</h2>
                <div className={styles.description}>We use your information to:</div>
                <ul className={styles.items}>
                    <li className={styles.item}>Provide, maintain, and improve our website.</li>
                    <li className={styles.item}>Respond to your inquiries and comments.</li>
                    <li className={styles.item}>Send newsletters or promotional materials, if you have opted in.</li>
                </ul>
            </div>
            <div>
                <h2 className={styles.subtitle}>Sharing of Information</h2>
                <div className={styles.description}>We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Cookies</h2>
                <div className={styles.description}>We use cookies to enhance your browsing experience. Cookies are small data files stored on your device. You can manage your cookie preferences through your browser settings.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Third-Party Links</h2>
                <div className={styles.description}>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Your Rights</h2>
                <div className={styles.description}>You have the right to access, update, or delete your personal information, such as your blogs and your comments. Please contact us at <Link href="/website-policies/contact">Contact Us</Link> for assistance.</div>
            </div>
            <div>
                <h2 className={styles.subtitle}>Changes to This Policy</h2>
                <div className={styles.description}>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the updated effective date.</div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;