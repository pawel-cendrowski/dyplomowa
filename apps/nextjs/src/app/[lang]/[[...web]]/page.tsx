import React from "react";

import { ContentPageOrPostType, PagePropsType } from "@/types/types";

import { notFound } from "next/navigation";
import { getPageData } from "@/functions/getPageData";
import { getLanguageStatic } from "@/functions/getLanguageStatic";

import availableLocales from '../../../config/locales.json';

import AboutPageTemplate from "@/components/pages/AboutPageTemplate";
import HomePageTemplate from "@/components/pages/HomePageTemplate";
import BlogPageTemplate from "@/components/pages/BlogPageTemplate";
import ContactPageTemplate from "@/components/pages/ContactPageTemplate";
import GenericPageTemplate from "@/components/pages/GenericPageTemplate";
import PostPageTemplate from "@/components/pages/PostPageTemplate";

import vars from '@/vars/vars';

const { home } = vars.const.slug;
const { page } = vars.const.pagetype;


// SSG DEFINITION - START
export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() {
  
  const internalHost = process.env.PRIVATE_STRAPI_URL;
  if (!internalHost) {
    console.warn("PRIVATE_STRAPI_URL not found. Skipping static generation.");
    return [];
  }
  
  const requests = availableLocales.map(async (lang) => 
    { 
     const res = await fetch(`${internalHost}/api/pages?locale=${lang}&pagination[pageSize]=100&fields[0]=slug&fields[1]=locale`);
    return await res.json();
    }
  );
  
  const results = await Promise.all(requests);
  
  const allPages = results.flatMap((res: { data: any }) => res.data || []);

  return allPages.map((page: any) => {
    const slugSegments = page.slug === home ? [] : page.slug.split('/');
    return {
      lang: page.locale,
      web: slugSegments
    };
  });
}
// SSG DEFINITION - END

const WebPage = async ({params} : Readonly<{ params: Promise<{ web?: string[], lang: string }>}>) => {
  
  const { web, lang } = await params;
  
   const pageSlug = web?.join('/') ?? home;
  //const pageSlug = web && web.length > 0 ? web.join('/') : home;
  
  const [fetchedData,languageStatic] = await Promise.all([
    getPageData(pageSlug, lang),
    getLanguageStatic(lang),
  ])
  
  if(!fetchedData?.pageData) return notFound();
  
  // map slug : page component
  const componentMapPageTemplates: Record<string, React.FC<PagePropsType>> = {
    "home": HomePageTemplate,
    "blog": BlogPageTemplate,
    "about": AboutPageTemplate,
    "contact": ContactPageTemplate,
    "default": GenericPageTemplate,
  };

  // map slug : post component
  const componentMapPostTemplates: Record<string, React.FC<PagePropsType>> = {
    "default": PostPageTemplate,
  };

  const layout = fetchedData?.pageData.data.template || "default";

  const Component = fetchedData.pageType == page as ContentPageOrPostType ? componentMapPageTemplates[layout] || GenericPageTemplate :
                                                     componentMapPostTemplates[layout] || PostPageTemplate;


  const propsForComponent = { pageData: fetchedData.pageData, pageType: fetchedData.pageType || page as ContentPageOrPostType , languageStatic};

  return (
    <>
      <main>
        <Component contentData={propsForComponent}/>
      </main>
    </>
  )
}

export default WebPage;