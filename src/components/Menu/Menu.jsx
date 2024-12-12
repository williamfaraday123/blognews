"use client"

import CardList from "@/components/cardList/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import MenuPosts from "@/components/MenuPosts/MenuPosts";
import { useState } from "react";
import styles from "./menu.module.css";

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Most Popular</h1>
            <MenuPosts />
            <CategoryList handleSelectCategory={handleSelectCategory} />
            <CardList selectedCategory={selectedCategory} />
        </div>
    );
};

export default Menu;