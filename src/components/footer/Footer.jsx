import Link from 'next/link';
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>mytravelblog</div>
            <p className={styles.desc}>Write blogs about your travel experiences here</p>
            <div className={styles.social}>
                <Link href="/website-policies/about">About Us</Link> |
                <Link href="/website-policies/contact">Contact Us</Link> |
                <Link href="/website-policies/privacy-policy">Privacy Policy</Link> |
                <Link href="/website-policies/terms-and-conditions">Terms and Conditions</Link> |
                <Link href="/website-policies/disclaimer">Disclaimer</Link>
            </div>
        </div>
    );
};

export default Footer;