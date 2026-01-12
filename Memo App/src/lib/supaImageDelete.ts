//src/lib/supaImageDelete.ts
import {supabase} from '../app/api/supabaseClient'

export async function deleteImagesByUrls(urls: string[]) {
  if (urls.length === 0) return

  const paths = urls.map(url => {
    const parts = url.split('/')
    return parts[parts.length - 1] // bestandsnaam
  })

  const {error} = await supabase.storage.from('images').remove(paths)

  if (error) {
    console.error('Supabase image delete error:', error)
    throw error
  }
}
