import Menu from "@/components/Menu/Menu";
import initializeDatabase from "@/database/dbSetup";
import styles from "./globals.css";

export default function Home() {

  //use a custom App entry point to trigger initializeDatabase() when the application is loaded.
  //This condition checks if the code is running on the server side (typeof window === 'undefined'). If true, it calls the initializeDatabase function to ensure the database is set up
  if (typeof window === 'undefined') {
    initializeDatabase().catch((err) => console.error('DB initialization failed:', err));
    console.log('DB initialization successful');
  } else {
    alert('not on server side');
  }

  return (
    <div className={styles.container}>
      <Menu />
    </div>
  );
}
