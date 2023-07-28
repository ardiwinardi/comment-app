import { Menu, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import styles from "./DropdownMenu.module.scss";

type Props = {
  menus: { label: string; onClick: VoidFunction }[];
};
export default function DropdownMenu({
  menus,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div style={{ position: "relative" }}>
      <Menu>
        <Menu.Button className={styles.button}>{children}</Menu.Button>
        <Transition as={Fragment}>
          <Menu.Items className={styles.items}>
            {menus.map((menu, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${active && "bg-blue-500"} ${styles.item}`}
                    onClick={() => menu.onClick()}
                  >
                    {menu.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
