import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Isaac BlogNews App</div>
            <p className={styles.desc}>This is a blog news app created by Isaac</p>
        </div>
    );
};

export default Footer;