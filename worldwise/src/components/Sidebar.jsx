import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />

      <AppNav />
      <Outlet />

      <div className={styles.footer}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Worldwise Inc.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
