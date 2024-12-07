import styles from "./write.module.css";

const Write = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" />
            <div className={styles.editor}>
                <input type="image" />
                <textarea
                    value={value}
                    onChange={setValue}
                    placeholder="Tell your story..."
                />
                <button className={styles.button}>Publish</button>
            </div>
        </div>
    );
};

export default Write;