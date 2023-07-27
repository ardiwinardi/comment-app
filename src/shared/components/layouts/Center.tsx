import { PropsWithChildren } from "react";
import styles from "./Center.module.scss";

export default function Center({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
