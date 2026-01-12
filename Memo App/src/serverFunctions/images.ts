// // src/serverFunctions/images.ts
// 'use server'
//
// import {protectedFormAction} from '@/lib/serverFunctions'
// import {uploadImageSchema} from '@/schemas/imageSchema'
// import {supabase} from '../app/api/supabaseClient'
//
// export const uploadMemoImageAction = protectedFormAction({
//   schema: uploadImageSchema,
//   functionName: 'Upload memo image',
//   serverFn: async ({data, logger}) => {
//     const file = data.file
//     if (!file) throw new Error('Geen bestand opgegeven')
//
//     const timestamp = Date.now()
//     const fileName = `${timestamp}-${file.name}`
//
//     const {error} = await supabase.storage.from('images').upload(fileName, file, {contentType: file.type})
//
//     if (error) throw error
//
//     const {data: urlData} = supabase.storage.from('images').getPublicUrl(fileName)
//     if (!urlData?.publicUrl) throw new Error('Kon publieke URL niet ophalen')
//
//     logger.info({
//       msg: 'Image uploaded',
//       fileName,
//       publicUrl: urlData.publicUrl,
//     })
//
//     return {
//       success: true,
//       submittedData: {publicUrl: urlData.publicUrl},
//     }
//   },
// })
