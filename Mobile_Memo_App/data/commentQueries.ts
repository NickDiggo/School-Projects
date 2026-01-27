import { supabase } from "@/lib/supabase";

export async function addComment(input: { memoId: string; userId: string; content: string }) {
  const { error } = await supabase.from("Comment").insert([
    { memoId: input.memoId, userId: input.userId, content: input.content },
  ]);
  if (error) throw error;
}

export async function deleteComment(commentId: string) {
  const { error } = await supabase.from("Comment").delete().eq("id", commentId);
  if (error) throw error;
}
