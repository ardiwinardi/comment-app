import { TextareaHTMLAttributes, useRef } from "react";

import useAutosizeTextarea from "@src/shared/hooks/useAutosizeTextarea";
import styles from "./Textarea.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, props.value?.toString() ?? "");

  return (
    <textarea
      className={styles.input}
      {...props}
      ref={textAreaRef}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
      }}
    />
  );
}
