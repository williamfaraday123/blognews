import Link from "next/link";
import styles from "./card.module.css";

const Card = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src="https://picsum.photos/200/300" alt="" fill />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>11.02.2023</span>
                    <span className={styles.category}>culture</span>
                </div>
                <Link href="/">
                    <h1>Lorem ipsum dolor sit amet</h1>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <Link href="/">Read More</Link>
            </div>
        </div>
    );
};

export default Card;