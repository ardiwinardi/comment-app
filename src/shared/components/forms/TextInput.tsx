import { InputHTMLAttributes, useId } from "react";
import styles from "./TextInput.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };
export default function TextInput(props: Props) {
  const id = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{props.label}</label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}
