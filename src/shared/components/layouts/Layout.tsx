import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
export default function Layout() {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
