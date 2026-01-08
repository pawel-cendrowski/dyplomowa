// import { revalidateTag } from "next/cache";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest){
//     const secret = request.nextUrl.searchParams.get('secret');
//     if(secret !== process.env.REVALIDATION_TOKEN){
//         return NextResponse.json({message: 'Invalid token' }, {status: 401 });
//     }

//     const tag = request.nextUrl.searchParams.get('tag');
// console.log(`[WEBHOOK RECEIVED] Attempting to revalidate tag: ${tag}`); // 🟢 DODAJ TO
//     if(tag) {
//         revalidateTag(tag, {});
// console.log(`[CACHE PURGED] Tag ${tag} successfully invalidated.`); // 🟢 I TO
//         return NextResponse.json({revalidated: true, now:Date.now()});
//     }
//     return NextResponse.json({revalidated:false, message:'Missing tag'}, {status:400});
// }