import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <div>
                    <Link href="https://isaac-seven.vercel.app/">About myself</Link>
                </div>
                <div>
                    <Link href="https://github.com/williamfaraday123">Github</Link>
                </div>
                <div>
                    <a href="mailto:isaa0015@e.ntu.edu.sg">Email</a>
                </div>
            </div>
            <div className={styles.logo}>Isaac BlogNews App</div>
            <p className={styles.description}>
                <b>This is a blog news app created by Isaac</b>
            </p>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/" className={styles.link}>Homepage</Link>
                <AuthLinks />
            </div>
        </div>
    );
};

export default Navbar;