import AuthDialog from "@src/features/auth/presentation/components/AuthDialog";
import { Flex } from "@src/shared/components/layouts";
import useDisclosure from "@src/shared/hooks/useDisclosure";
import { Avatar } from "../commons";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { open, control } = useDisclosure();
  return (
    <div className={styles.navbar}>
      <Flex>
        <div>Logo</div>
        <nav>
          <Avatar text="AS" onClick={() => control.open()} />
        </nav>
      </Flex>

      <AuthDialog open={open} handleClose={() => control.close()} />
    </div>
  );
}
