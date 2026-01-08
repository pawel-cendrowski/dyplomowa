import {
  BannerType,
  DataExtended,
  GetPageDataInType,
  PageDataType,
  PageDataValidatedType,
  PageMetaType,
} from "@/types/types";
import vars from "@/vars/vars";

const { revalidateTime } = vars.const;

const pageDataValidate = (x: PageDataType): PageDataValidatedType => {
  return {
    ...x,
    content: x.content ?? "",
    excerpt: typeof x.excerpt === "string" ? x.excerpt : "",
    localizations: x.localizations && x.localizations.length > 0
        ? x.localizations
        : null,
    banner: x.banner
      ? {
          ...(x.banner as BannerType),
          alternativeText: x.banner.alternativeText ?? "",
        }
      : null,
  };
};

const pageMetaValidate = (x: PageMetaType): PageMetaType => {
  return {
    pagination: x.pagination ?? {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 1,
    },
  };
};

const getValidatePageData = async (
  fetchUrl: string,
): Promise<DataExtended | null> => {
  try {
    
    const internalHost = process.env.PRIVATE_STRAPI_URL;
  
    const publicHost = process.env.PUBLIC_STRAPI_URL;

    const fetchPath = `${internalHost}${fetchUrl}`;

    const res = await fetch(fetchPath, { next: { revalidate: revalidateTime } });

    if (!res.ok) return null;

    const resData: GetPageDataInType = await res.json();

    if (!resData.data || resData.data.length === 0) return null;

    const dataValidated = pageDataValidate(resData.data[0]);
    const metaValidated = pageMetaValidate(resData.meta);

    const public_banner_url = dataValidated.banner?.url
      ? publicHost + dataValidated.banner?.url
      : "";

    const resDataExtended: DataExtended = {
      data: dataValidated,
      meta: metaValidated,
      extended: { banner: { public_banner_url } },
    };

    return resDataExtended;
  } catch (error) {
    console.error("getPageData ERROR:", error);
    throw error;
  }
}

export default getValidatePageData;