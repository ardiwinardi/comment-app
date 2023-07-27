import { PropsWithChildren } from "react";

import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className={styles.container}>
      <Navbar />
      {children}
    </main>
  );
}
