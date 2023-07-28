import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Center.module.scss";
type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>;
export default function Center(props: Props) {
  return (
    <div className={styles.container} {...props}>
      {props.children}
    </div>
  );
}
