import { AuthContext } from "@src/features/auth/presentation/contexts/AuthContext";
import authRoutes from "@src/features/auth/presentation/routes";
import { shortenName } from "@src/shared/utils/string-format";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../commons";
import DropdownMenu from "../commons/DropdownMenu";
import { Button } from "../forms";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const menus = [{ label: "Logout", onClick: () => logout() }];

  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <div>Logo</div>
        <nav>
          {user ? (
            <DropdownMenu menus={menus}>
              <Avatar text={shortenName(user?.name ?? "")} />
            </DropdownMenu>
          ) : (
            <Link to={authRoutes.login}>
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
