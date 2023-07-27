import { Avatar, Flex } from ".";
import styles from "./Navbar.module.scss";
export default function Navbar() {
  return (
    <div className={styles.container}>
      <Flex>
        <div>Logo</div>
        <nav>
          <Avatar text="AS" />
        </nav>
      </Flex>
    </div>
  );
}
