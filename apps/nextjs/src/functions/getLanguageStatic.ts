import 'server-only';

import { LanguageDefaultType } from '@/components/languages/types/types';
import vars from '@/vars/vars';

const { defaultLocale } = vars.const;

type LocaleModule = {
    [key: string]: LanguageDefaultType;
};

export const getLanguageStatic = async (pageLocale: string) : Promise<LanguageDefaultType> =>{

    try {

        const module = await import(`@/components/languages/${pageLocale}`) as LocaleModule;
        if(module[pageLocale]){
            return module[pageLocale];
        }

        throw Error('LANGUAGE_DICTIONARY_LOAD_MODULE_PHASE_1');

    } catch (initialError) {

        console.warn(`Unable to load language dictionary: `, initialError);

        try {

            const module = await import(`@/components/languages/${defaultLocale}`) as LocaleModule;
            
            if(module[defaultLocale]){
                return module[defaultLocale];
            }

            throw Error('LANGUAGE_DICTIONARY_DEFAULT_LOAD_MODULE_PHASE_2');
        
        } catch (error) {

            console.error(`Unable to load default language dictionary: `, error);

            throw Error('Unable to load language dictionary');
        }
    }
}