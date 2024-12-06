import CategoryList from "../categoryList/CategoryList";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <CategoryList />
            <div className={styles.info}>
                <div className={styles.logo}>Isaac BlogNews App</div>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
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
        </div>
    );
};

export default Footer;