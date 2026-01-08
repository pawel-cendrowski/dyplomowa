import { PagePropsType } from "@/types/types";
import Hero from "../hero/Hero";
import DisplayParsedContent from "../utils/DisplayParsedContent";

const ContactPageTemplate = (props : PagePropsType) => {

  const {banner, content, title } = props.contentData.pageData.data;
  const {public_banner_url} = props.contentData.pageData.extended.banner;

  return (
    <>
      {banner && (<Hero bannerData={banner} publicUrl={public_banner_url} title={title} />)}
      <article className="content content-contact">
      
      <div className="contactbox"><DisplayParsedContent content={content}/></div>
        

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.6822092452576!2d20.98708527656306!3d52.24915565624689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc7893fef3ad%3A0x9e084209594a5b38!2sWarszawska%20Wy%C5%BCsza%20Szko%C5%82a%20Informatyki!5e0!3m2!1spl!2spl!4v1767793657231!5m2!1spl!2spl" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border:0}} className="map-contact"/>
      </article>
    </>
  );
};

export default ContactPageTemplate;
