import { supabase } from "@/lib/supabase";
import type { Map } from "@/models/types";
import { countMemosForMap } from "@/data/memoQueries"; // ✅ als je count daar zet

export async function fetchMapsForUser(userId: string): Promise<Map[]> {
  const { data, error } = await supabase
    .from("Map")
    .select("id,name,userId")
    .eq("userId", userId)
    .order("name", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id as string,
    name: row.name as string,
    userId: (row.userId as string | null) ?? undefined,
  }));
}

export async function createMap(input: { userId: string; name: string }) {
  const name = input.name.trim();
  if (!name) throw new Error("Mapnaam is verplicht.");

  const { error } = await supabase.from("Map").insert([{ userId: input.userId, name }]);
  if (error) throw error;
}

export async function renameMap(input: { mapId: string; name: string }) {
  const name = input.name.trim();
  if (!name) throw new Error("Mapnaam is verplicht.");

  const { error } = await supabase.from("Map").update({ name }).eq("id", input.mapId);
  if (error) throw error;
}

export async function deleteMapSafe(input: { mapId: string }) {
  const count = await countMemosForMap(input.mapId);
  if (count > 0) {
    throw new Error("Je kan deze map niet verwijderen: er hangen nog memo’s aan vast.");
  }

  const { error } = await supabase.from("Map").delete().eq("id", input.mapId);
  if (error) throw error;
}
