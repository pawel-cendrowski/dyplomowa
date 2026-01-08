import { PagePropsType } from "@/types/types";
import Hero from "../hero/Hero";
import DisplayParsedContent from "../utils/DisplayParsedContent";

const PostPageTemplateTemplate = (props : PagePropsType) => {

  const {banner, content, title, excerpt } = props.contentData.pageData.data;
  const {public_banner_url} = props.contentData.pageData.extended.banner;

  return (
    <>
      <p>Post TEMPLATKA</p>
      {banner && (
        <Hero bannerData={banner} publicUrl={public_banner_url} title={title} />
      )}

     
      <p>{props.contentData.languageStatic.common.loading}</p>
      <DisplayParsedContent content={content}/>
      <DisplayParsedContent content={excerpt}/>
    </>
  );
};

export default PostPageTemplateTemplate;
