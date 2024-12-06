import Link from "next/link";
import styles from "./comments.module.css";

const Comments = () => {

    const status = "authenticated"
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === "authenticated" ? (
                <div className={styles.write}>
                    <textarea
                        placeholder="write a comment..."
                        className={styles.input}
                    />
                    <button className={styles.button}>Send</button>
                </div>
            ) : (
                <Link href="/login">Login to write a comment</Link>
            )}
            <div className={styles.comments}>
                <div className={styles.comment}>
                    <div className={styles.userInfo}>
                        <span className={styles.username}>Isaac</span>
                        <span className={styles.date}>10.03.2023</span>
                    </div>
                    <div className={styles.desc}>description written in comment</div>
                </div>
            </div>
        </div>
    );
};

export default Comments;