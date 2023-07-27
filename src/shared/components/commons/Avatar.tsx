import { HtmlHTMLAttributes } from "react";
import styles from "./Avatar.module.scss";

type Props = HtmlHTMLAttributes<HTMLDivElement> & { text: string };

export default function Avatar(props: Props) {
  return (
    <div className={styles.box} {...props}>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
}
