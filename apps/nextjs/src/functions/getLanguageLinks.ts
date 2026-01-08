import { DataExtended, SwitchLanguageType } from "@/types/types";
import vars from "@/vars/vars";

const { home } = vars.const.slug;

const prepareLocalePathUrl = (locale: string, slug: string) : string => {
    const path = slug === home ? '/' : `/${slug}`;
    return `/${locale}${path}`;
}

export const getLanguageLinks = (pageData: DataExtended | undefined | null, availableLocales: string[]) : SwitchLanguageType =>{
    const links : Record<string, string> = {}; // pusty obiekt który na końcu zostanie zwrócony z kolekcją danych

    // 0. jeśli nie dostaniemy obiektu z danymi, niech awaryjnie zostaną ustawione linki do stron domowych
    if(!pageData?.data){
        for(const x of availableLocales){
            links[x] = prepareLocalePathUrl(x, home);
        }
        return links;
    }

    const currentPage = pageData.data;
    const currentLocale = currentPage.locale;
    const currentSlug = currentPage.slug;

    // 1. ustanów link do obecnej strony
    links[pageData.data.locale] = prepareLocalePathUrl(currentLocale, currentSlug); 


    // 2. ustanów linki dla tłumaczeń w znajdujących się w relacji z obecną stroną
    if(pageData.data.localizations &&
       Array.isArray(pageData.data.localizations) &&
       pageData.data.localizations.length > 0){
        for(const x of pageData.data.localizations){
            links[x.locale] = prepareLocalePathUrl(x.locale, x.slug);
        }
       }

    for(const x of availableLocales){
        if(!links[x]){
            links[x] = prepareLocalePathUrl(x, home);
        }
    }


    return links;
}