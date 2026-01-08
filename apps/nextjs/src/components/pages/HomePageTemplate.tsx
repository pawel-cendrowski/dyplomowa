import { PagePropsType } from "@/types/types";
import DisplayParsedContent from "../utils/DisplayParsedContent";
import Hero from "../hero/Hero";

const HomePageTemplate = (props : PagePropsType) => {
  
  const {banner, content, title } = props.contentData.pageData.data;
  const {public_banner_url} = props.contentData.pageData.extended.banner;
  
  return (
    <> 
      {banner && (<Hero bannerData={banner} publicUrl={public_banner_url} title={title} />)}
      <article className="content">
        <DisplayParsedContent content={content}/>
      </article>
      </>
  );
};

export default HomePageTemplate;
