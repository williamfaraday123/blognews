"use client"

import categories from "@/components/categoryList/categoryList.json";
import styles from "./categoryList.module.css";

const CategoryList = ({ handleSelectCategory }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                {categories.map((category, index) => (
                    <button
                        key = {index}
                        onClick={() => handleSelectCategory(category)}
                        className={styles.category}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;