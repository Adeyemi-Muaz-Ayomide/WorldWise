import styles from "./Sidebar.module.css";
import Logo from './Logo';
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <Logo />
       
    <div className={styles.footer}>
        <p className={styles.copyright}>
            © {new Date().getFullYear()} Worldwise Inc.
        </p>
    </div>
    </div>
  )
}

export default Sidebar