import { supabase } from "@/lib/supabase";

export async function setTagsForMemo(input: { memoId: string; tagIds: string[] }) {
  const uniqueTagIds = Array.from(new Set(input.tagIds));
  if (uniqueTagIds.length === 0) return;

  const rows = uniqueTagIds.map((tagId) => ({ memoId: input.memoId, tagId }));
  const { error } = await supabase.from("MemoTag").insert(rows);
  if (error) throw error;
}
