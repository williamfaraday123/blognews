import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>mytravelblog</div>
            <p className={styles.desc}>Write blogs about your travel experiences here</p>
        </div>
    );
};

export default Footer;