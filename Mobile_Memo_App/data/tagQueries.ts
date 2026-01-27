import { supabase } from "@/lib/supabase";
import type { Tag } from "@/models/types";

export async function fetchTagsForUser(userId: string): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("Tag")
    .select("id,name,userId")
    .eq("userId", userId)
    .order("name", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id as string,
    name: row.name as string,
  }));
}

export async function createTag(input: { userId: string; name: string }) {
  const name = input.name.trim();
  if (!name) throw new Error("Tagnaam is verplicht.");

  const { error } = await supabase.from("Tag").insert([{ userId: input.userId, name }]);
  if (error) throw error;
}

export async function renameTag(input: { tagId: string; name: string }) {
  const name = input.name.trim();
  if (!name) throw new Error("Tagnaam is verplicht.");

  const { error } = await supabase.from("Tag").update({ name }).eq("id", input.tagId);
  if (error) throw error;
}

export async function deleteTag(input: { tagId: string }) {
  const { error } = await supabase.from("Tag").delete().eq("id", input.tagId);
  if (error) throw error;
}
