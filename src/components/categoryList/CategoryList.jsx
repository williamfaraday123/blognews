import Link from "next/link";
import styles from "./categoryList.module.css";

const CategoryList = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                {["style", "fashion", "food", "travel"].map((category) => (
                    <Link 
                        href={`/blog/${category}`}
                        className={styles.category}
                    >
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;