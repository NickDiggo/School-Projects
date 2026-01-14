// // src/lib/supaImageDelete.ts
// import {supabase} from '../app/api/supabaseClient'
//
// const SUPABASE_URL = process.env.SUPABASE_URL // uit env
//
// export async function deleteImagesByUrls(urls: string[]) {
//   if (urls.length === 0) return
//
//   const bucketName = 'images'
//   const baseUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/`
//
//   const paths = urls.map(url => {
//     if (!url.startsWith(baseUrl)) {
//       throw new Error(`URL ${url} is geen geldige publieke bucket URL`)
//     }
//     return url.replace(baseUrl, '') // pad binnen bucket
//   })
//
//   const {error} = await supabase.storage.from(bucketName).remove(paths)
//
//   if (error) {
//     console.error('Supabase image delete error:', error)
//     throw error
//   }
// }
