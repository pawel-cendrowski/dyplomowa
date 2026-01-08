import { LanguageDefaultType } from "@/components/languages/types/types";



export type PageMenuItem = {
  id: number;
  title: string;
  slug: string;
  url: string;
};

export type ContentPageOrPostType = "page" | "post";



export type BannerType = {
        id: number,
        documentId: string,
        name: string,
        alternativeText: string,
        caption: string,
        width: number,
        height: number,
        formats: FormatsInBannerType,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: string,
        provider: string,
        provider_metadata: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }



export type PageMetaType = {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}
export type SingleFormatInBannerType = {
        ext: string,
        url: string,
        hash: string,
        mime: string,
        name: string,
        path: string,
        size: number,
        width: number,
        height: number,
        sizeInBytes: number
    }

export type FormatsInBannerType = {
    large: SingleFormatInBannerType,
    small: SingleFormatInBannerType,
    medium: SingleFormatInBannerType,
    thumbnail: SingleFormatInBannerType
}

export type ExtendUrlType = {
extended:{
        banner:{
            public_banner_url: string
        }
    }
}


export type HeroPropsType = {
    publicUrl: string,
    bannerData: BannerType,
    title: string
}




export type LocalizationsObjectType = 
    {
        id: number,
        documentId: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        locale: string,
        title: string,
        slug: string,
        position:number,
        content: string,
    }

    export type LocalizationsType = LocalizationsObjectType[]





export type PageDataType = {
    
    id: number,
    documentId: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    title: string,
    slug: string,
    excerpt?: string,
    content: string | null,
    position: number,
    locale: string,
    banner: BannerType | null,
    localizations: LocalizationsType | [],
    template: string | null
}

export type PageDataValidatedType = Omit<PageDataType,'excerpt' | 'localizations'> & {
content: string,
excerpt: string,
localizations: LocalizationsType | null
}

export type GetPageDataInType = {
    data: PageDataType[],
    meta: PageMetaType
}

export type GetPageDataOutType = {
    data: PageDataValidatedType,
    meta: PageMetaType
}

export type DataExtended = GetPageDataOutType & ExtendUrlType & {}

export type PagePropsType = {contentData:{pageData: DataExtended, pageType: ContentPageOrPostType, languageStatic:LanguageDefaultType}}




export type SwitchLanguageType = {
    // pl: string,
    // en: string
    [key: string]: string,
}