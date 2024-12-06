import Comments from "@/components/comments/Comments";
import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";

const SinglePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1>Blog Title</h1>
                    <div className={styles.user}>Username</div>
                    <div>publishDate</div>
                </div>
                <div className={styles.imageContainer}>
                    <img
                        src="https://picsum.photos/200/300"
                        alt=""
                        fill
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.post}></div>
                    <div className={styles.comments}>
                        <Comments />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    );
};

export default SinglePage;