import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <div>About myself</div>
                <div>Github</div>
                <div>Email</div>
            </div>
            <div className={styles.logo}>Isaac's BlogNews App</div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/">Homepage</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/about">About</Link>
                <AuthLinks />
            </div>
        </div>
    );
};

export default Navbar;