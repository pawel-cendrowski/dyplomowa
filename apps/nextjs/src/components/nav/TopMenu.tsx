import Link from "next/link";
import styles from "./topmenu.module.css";

import { PageMenuItem } from "@/types/types";

const TopMenu = ({ menuItems } : { menuItems: PageMenuItem[] }) => {
  return (
    <nav className={styles.topmenu}>
      <ul>
        {menuItems.map((x) => (
          <li key={x.id}>
            <Link href={x.url}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default TopMenu;