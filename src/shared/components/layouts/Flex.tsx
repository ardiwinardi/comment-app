import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Flex.module.scss";

type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>;

export default function Flex({ children, style }: Props) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}
