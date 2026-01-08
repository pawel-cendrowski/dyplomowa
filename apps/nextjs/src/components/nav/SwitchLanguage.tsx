
'use client';
import { SwitchLanguageType } from "@/types/types";
import Cookies from "js-cookie";
import Link from "next/link";
import vars from "@/vars/vars";

const { cookieName } = vars.const;

const SwitchLanguage = ({ langItems } : { langItems: SwitchLanguageType }) =>{
    
    const languages = Object.entries(langItems).sort();
    
    const handleLanguageChange = (lang: string) => {
        Cookies.set(cookieName, lang, { expires: 365 })
    }

    return (
        <>
            <ul style={{display:"flex", listStyleType:"unset"}}>
                {languages.map( x => {
                    return (
                    <li key={x[0]} style={{padding:"0 10px", listStyleType:"none"}}>
                        <Link href={x[1]} onClick={() => handleLanguageChange}>{x[0].toUpperCase()}</Link>
                    </li>
                    )
                })}
            </ul>
        </>
    )
}
export default SwitchLanguage;