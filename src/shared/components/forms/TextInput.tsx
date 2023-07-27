import { TextareaHTMLAttributes, useRef, useState } from "react";

import useAutosizeTextarea from "@src/shared/hooks/useAutosizeTextarea";
import styles from "./TextInput.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextInput(props: Props) {
  const [value, setValue] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, value);

  return (
    <textarea
      className={styles.input}
      {...props}
      ref={textAreaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
