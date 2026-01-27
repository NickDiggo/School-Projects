// src/lib/supabase/supaImageUpload.ts
import {supabase} from '../app/api/supabaseClient'

interface UploadImageParams {
  file: File
}

/**
 * Upload een afbeelding naar Supabase en retourneer de publieke URL
 */
export const uploadImageToSupabase = async ({file}: UploadImageParams): Promise<string> => {
  if (!file) throw new Error('No file provided')

  // Naam genereren op basis van originele naam + timestamp
  const timestamp = Date.now()
  const fileName = `${timestamp}-${file.name}`

  // Uploaden naar de bucket "images"
  const {error} = await supabase.storage.from('images').upload(fileName, file, {contentType: file.type})

  if (error) throw error

  // Haal publieke URL op
  const {data} = supabase.storage.from('images').getPublicUrl(fileName)

  if (!data?.publicUrl) throw new Error('No public URL found')

  return data.publicUrl
}
