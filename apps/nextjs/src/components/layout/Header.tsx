import { PageMenuItem, SwitchLanguageType } from "@/types/types";
import TopMenu from "../nav/TopMenu";
import styles from "./header.module.css";
import SwitchLanguage from "../nav/SwitchLanguage";

export default function Header({menuItems,langItems}:{menuItems:PageMenuItem[], langItems:SwitchLanguageType}) {
  return (
    <header className={styles.header} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:"80%",margin:"auto"}}>
      <span><a href="/">SMACZNA PRZYSTAŃ</a></span>
      <div style={{display:"flex"}}>
        <TopMenu menuItems={menuItems} />
        <SwitchLanguage langItems={langItems}/>
      </div>
      
    </header>
  );
}
