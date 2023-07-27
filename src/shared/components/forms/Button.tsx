import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLButtonElement>;
export default function Button(props: Props) {
  return (
    <button type="button" className={styles.button} {...props}>
      {props.children}
    </button>
  );
}
