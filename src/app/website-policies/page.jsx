"use client"

import Link from 'next/link';
import styles from './website-policies.module.css';

const WebsitePolicies = () => {
    return (
        <div className={styles.container}>
            <Link href="/website-policies/about">About Us</Link>
            <Link href="/website-policies/contact">Contact Us</Link>
            <Link href="/website-policies/privacy-policy">Privacy Policy</Link>
            <Link href="/website-policies/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/website-policies/disclaimer">Disclaimer</Link>
        </div>
    );
};

export default WebsitePolicies;