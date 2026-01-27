// data/imageUpload.ts
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";

export async function uploadImageToSupabase({fileUri,}: {
  fileUri: string;
}): Promise<{ publicUrl: string }> {
  const file = await fetch(fileUri).then((res) => res.arrayBuffer());

  const extension = fileUri.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `${randomUUID()}.${extension}`;
  const filePath = `memos/${fileName}`;

  const contentType =
    extension === "png" ? "image/png" :
      extension === "webp" ? "image/webp" :
        "image/jpeg";

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file, { contentType });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  if (!data?.publicUrl) throw new Error("Geen publicUrl gekregen van Supabase.");

  return { publicUrl: data.publicUrl };
}
