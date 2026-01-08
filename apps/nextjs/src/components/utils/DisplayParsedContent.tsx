import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

const DisplayParsedContent = ({content}: {content:string |undefined | null}) =>{
    
    if(!content) return null;
    
    const sanitizeConfig = {
        ADD_TAGS: ["iframe", "img"], 
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"]
    };
    
    const purifiedContent = DOMPurify.sanitize(content, sanitizeConfig);

    return(
        <>
            {parse(purifiedContent)}
        </>
    )
}
export default DisplayParsedContent;