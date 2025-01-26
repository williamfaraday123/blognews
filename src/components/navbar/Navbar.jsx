import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>mytravelblog</div>
            <p className={styles.description}>
                <b>Share your travel experiences here</b>
            </p>
            <div className={styles.social}>
                <Link href="/website-policies/about">About Us</Link> |
                <Link href="/website-policies/contact">Contact Us</Link> |
                <Link href="/website-policies/privacy-policy">Privacy Policy</Link> |
                <Link href="/website-policies/terms-and-conditions">Terms and Conditions</Link> |
                <Link href="/website-policies/disclaimer">Disclaimer</Link>
            </div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/" className={styles.link}>Homepage</Link>
                <AuthLinks />
            </div>
        </div>
    );
};

export default Navbar;