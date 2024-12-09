import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = () => {
    return (
        <div className={styles.items}>
            {[1, 2, 3, 4].map((item, index) => (
                <Link key={index} href="/" className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img
                            src="https://picsum.photos/200/300"
                            alt=""
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <span className={styles.category}>category</span>
                        <h3 className={styles.postTitle}>Title</h3>
                        <div className={styles.detail}>
                            <span className={styles.username}>Isaac</span>
                            <span className={styles.date}>10.03.2023</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MenuPosts;