import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";

const CardList = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                {[1, 2, 3, 4].map((card, index) => (
                    <Card key={index} />
                ))}
            </div>
            <Pagination />
        </div>
    );
};

export default CardList;