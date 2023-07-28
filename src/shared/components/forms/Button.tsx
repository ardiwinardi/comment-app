import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type Props = PropsWithChildren<{
  isTextLink?: boolean;
  variant?: "primary" | "default" | "success" | "warning" | "danger";
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const variant = props.variant ?? (props.isTextLink ? undefined : "primary");

  const buttonProps = { ...props };
  delete buttonProps.isTextLink;
  delete buttonProps.variant;
  return (
    <button
      type="button"
      className={classNames(
        props.isTextLink ? styles.textLink : styles.button,
        {
          [`${styles.primary}`]: variant === "primary",
          [`${styles.success}`]: variant === "success",
          [`${styles.default}`]: variant === "default",
          [`${styles.warning}`]: variant === "warning",
          [`${styles.danger}`]: variant === "danger",
        }
      )}
      {...buttonProps}
    >
      {props.children}
    </button>
  );
}
