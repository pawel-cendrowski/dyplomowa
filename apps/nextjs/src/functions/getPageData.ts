import { ContentPageOrPostType, DataExtended } from "@/types/types";
import { cache } from "react";
import getValidatePageData from "./getValidatePageData";
import vars from "@/vars/vars";

const { page, post } = vars.const.pagetype;

export const getPageData = cache(async (pageSlug: string, pageLocale: string) =>{
    
    let pageData : DataExtended | null = null;
    let pageType: ContentPageOrPostType = page as ContentPageOrPostType;
    const reqQuery = `filters[slug]=${pageSlug}&locale=${pageLocale}&populate=*`;
    
    const [pageRes, postRes] = await Promise.all([
        getValidatePageData(`/api/pages?${reqQuery}`),
        getValidatePageData(`/api/posts?${reqQuery}`)
    ]);
    
    if (pageRes) {
        pageType = page as ContentPageOrPostType;
        pageData = pageRes;
    } else if (postRes) {
        pageType = post as ContentPageOrPostType;
        pageData = postRes;
    }

    return {
        pageData,
        pageType,
        pageLocale
    }
})