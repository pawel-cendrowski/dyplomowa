import { NextResponse, NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import availableLocales from './config/locales.json';
import vars from "./vars/vars";

const { defaultLocale, cookieName } = vars.const;
const { technicalPaths, protectedPaths } = vars;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const LOCALES = availableLocales.length > 0 ? availableLocales : [defaultLocale];

  const serializedLocales = JSON.stringify(LOCALES);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-available-locales', serializedLocales);
  
  if (technicalPaths.some((path) => pathname.startsWith(path))) return NextResponse.next();
  if (protectedPaths.some((path) => pathname.startsWith(path))) return NextResponse.next();
  
  const hasLocalePrefix = LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  
  if (hasLocalePrefix) { return NextResponse.next({ request: { headers: requestHeaders, }})}
  
  let targetLocale = defaultLocale;
  
  const cookieLang = request.cookies.get(cookieName)?.value;
  
  if(cookieLang && LOCALES.includes(cookieLang)) { targetLocale = cookieLang } 
  else{
    try {
      const headers = { 'accept-language': request.headers.get('accept-language') || '' };
      const languages = new Negotiator({ headers }).languages();
      targetLocale = match(languages, LOCALES, defaultLocale);
    }
    catch (error) {}
  }
  
  const newUrl = new URL(`/${targetLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };