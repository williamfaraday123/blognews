import styles from "./loginPage.module.css";

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <input value={username}></input>
            <input value={password}></input>
            <button>Login</button>
        </div>
    );
};

export default LoginPage;