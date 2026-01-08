import "../globals.css";

import { Inter } from "next/font/google";

const inter = Inter({subsets: ["latin"]})


export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{ lang: string }>}>){
const { lang } = await params;
const insertLang = lang;

  return (
  <>
    <html lang={insertLang}>
      <body className={inter.className}>{children}</body>
    </html>
  </>
  )
}