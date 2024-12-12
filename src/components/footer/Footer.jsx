import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Isaac BlogNews App</div>
            <p className={styles.desc}>This is a blog news app created by Isaac</p>
            <div className={styles.social}>
                <div>About myself</div>
                <div>Github</div>
                <div>Email</div>
            </div>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Homepage</Link>
                <Link href="/contact" className={styles.link}>Contact</Link>
                <Link href="/about" className={styles.link}>About</Link>
            </div>
        </div>
    );
};

export default Footer;