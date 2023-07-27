import { Dialog as DialogApp } from "@headlessui/react";
import { PropsWithChildren, useRef } from "react";
import styles from "./Dialog.module.scss";

type Props = PropsWithChildren<{
  open: boolean;
  handleClose: () => void;
}>;

export default function Dialog({ open, children, handleClose }: Props) {
  const completeButtonRef = useRef(null);

  return (
    <DialogApp
      initialFocus={completeButtonRef}
      open={open}
      onClose={() => handleClose()}
      className={styles.dialog}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.container}>
        <DialogApp.Panel className={styles.panel}>
          <main className={styles.content}>{children}</main>
        </DialogApp.Panel>
      </div>
    </DialogApp>
  );
}
