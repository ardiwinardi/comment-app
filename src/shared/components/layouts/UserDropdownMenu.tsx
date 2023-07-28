import { Menu, Transition } from "@headlessui/react";
import { AuthContext } from "@src/features/auth/presentation/contexts/AuthContext";
import { Fragment, PropsWithChildren, useContext } from "react";
import styles from "./UserDropdownMenu.module.scss";
export default function UserDropdownMenu({ children }: PropsWithChildren) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <Menu>
      <Menu.Button className={styles.button}>{children}</Menu.Button>
      <Transition as={Fragment}>
        <Menu.Items className={styles.items}>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && "bg-blue-500"} ${styles.item}`}
                onClick={() => logout()}
              >
                Settings
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && "bg-blue-500"} ${styles.item}`}
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
