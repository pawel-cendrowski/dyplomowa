import { PageMenuItem } from "@/types/types";
import vars from "@/vars/vars";

const { home } = vars.const.slug;
const { defaultLocale, revalidateTime } = vars.const;

type GetMenuItemsReturnType = PageMenuItem & { url: string; }

const getMenuItems = async (locale: string | undefined = defaultLocale): Promise<GetMenuItemsReturnType[] | null> => {
  try {

    const internalHost = process.env.PRIVATE_STRAPI_URL;
    
    const queryParams = [
      `sort=position:asc`,
      `locale=${locale}`,
      `fields[0]=title`,
      `fields[1]=slug`,
      `fields[2]=position`
    ].join('&');

    const fetchUrl = `${internalHost}/api/pages?${queryParams}`;
    
    const res = await fetch(fetchUrl, { next: { revalidate: revalidateTime } });
    if (!res.ok) {
      console.warn("Fetch failed:", res.status, res.statusText);
      return null;
    }
    
    const resData = await res.json();
    
    if (!resData?.data) return null;
    
    const resItems: PageMenuItem[] = resData.data;
    
    return resItems.map((x) => {
      
      const prefix = `/${locale}`;
      
      const slugPart = x.slug === home ? '' : `/${x.slug}`;
      
      return {
        ...x,
        url: `${prefix}${slugPart}`
      };
    });
  } catch (error) {
    console.error("getMenuItems ERROR:", error);
    return null;
  }
}

export default getMenuItems;