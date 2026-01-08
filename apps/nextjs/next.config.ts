import type { NextConfig } from "next";

const nextConfig: NextConfig = {

images: {

    remotePatterns: [
        
     
         {
        protocol: 'http',
        hostname: process.env.PUBLIC_STRAPI_URL 
          ? new URL(process.env.PUBLIC_STRAPI_URL).hostname 
          : 'localhost',
        port: '',
        pathname: '/uploads/**',
      },
       {
        protocol: 'http',
        hostname: process.env.PRIVATE_STRAPI_URL 
          ? new URL(process.env.PRIVATE_STRAPI_URL).hostname 
          : 'srv-strapi',
        port: '1337',
        pathname: '/uploads/**',
      },
       
    ],


    
  },
  
}


export default nextConfig;
