import CategoryList from "@/components/categoryList/CategoryList";
import MenuPosts from "../MenuPosts/MenuPosts";
import styles from "./menu.module.css";

const Menu = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Most Popular</h1>
            <MenuPosts />
            <CategoryList />
            <h1 className={styles.title}>Editors Pick</h1>
            <MenuPosts />
        </div>
    );
};

export default Menu;