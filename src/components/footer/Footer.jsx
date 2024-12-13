import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Isaac BlogNews App</div>
            <p className={styles.desc}>This is a blog news app created by Isaac</p>
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
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Homepage</Link>
                <Link href="/contact" className={styles.link}>Contact</Link>
                <Link href="/about" className={styles.link}>About</Link>
            </div>
        </div>
    );
};

export default Footer;