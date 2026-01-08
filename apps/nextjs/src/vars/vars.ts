const vars ={

    const:{
        pagetype:{
            page:'page',
            post:'post'
        },
        slug:{
            home:'home',
        },
        revalidateTime: 10,
        defaultLocale: 'en',
        cookieName: 'site-lang',
    },
    protectedPaths: [
    '/dashboard',
    '/api'
    ],
    technicalPaths: [
    '/_next',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
    ],

}










export default vars;
