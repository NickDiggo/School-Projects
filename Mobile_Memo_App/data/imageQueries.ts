import { supabase } from "@/lib/supabase";

export async function addImage(input: { memoId: string; url: string; description?: string | null }) {
  const { error } = await supabase.from("Image").insert({
    memoId: input.memoId,
    url: input.url,
    description: input.description ?? null,
  });
  if (error) throw error;
}

export async function deleteImage(imageId: string) {
  const { error } = await supabase.from("Image").delete().eq("id", imageId);
  if (error) throw error;
}
