//data/memoQueries.ts
import { supabase } from "@/lib/supabase";
import type { Comment, Image, Map as MapType, Memo, Tag } from "@/models/types";


type MemoRow = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  userId: string;
  mapId: string;
};

type MapRow = {
  id: string;
  name: string;
  userId: string | null;
};

type CommentRow = {
  id: string;
  content: string;
  createdAt: string;
  memoId: string;
  userId: string;
};

type ImageRow = {
  id: string;
  url: string;
  description: string | null;
  createdAt: string;
  memoId: string;
};

type MemoTagRow = {
  id: string;
  memoId: string;
  tagId: string;
};

type TagRow = {
  id: string;
  name: string;
  userId: string | null;
};


function toMemoRow(row: unknown): MemoRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    title: r.title as string,
    content: (r.content as string | null) ?? null,
    createdAt: r.createdAt as string,
    userId: r.userId as string,
    mapId: r.mapId as string,
  };
}

function toMapRow(row: unknown): MapRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    name: r.name as string,
    userId: (r.userId as string | null) ?? null,
  };
}

function toCommentRow(row: unknown): CommentRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    content: r.content as string,
    createdAt: r.createdAt as string,
    memoId: r.memoId as string,
    userId: r.userId as string,
  };
}

function toImageRow(row: unknown): ImageRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    url: r.url as string,
    description: (r.description as string | null) ?? null,
    createdAt: r.createdAt as string,
    memoId: r.memoId as string,
  };
}

function toMemoTagRow(row: unknown): MemoTagRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    memoId: r.memoId as string,
    tagId: r.tagId as string,
  };
}

function toTagRow(row: unknown): TagRow {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    name: r.name as string,
    userId: (r.userId as string | null) ?? null,
  };
}


export async function fetchMemoById(memoId: string): Promise<Memo | null> {
  // 1) Memo
  const { data: memoData, error: memoErr } = await supabase
    .from("Memo")
    .select("id,title,content,createdAt,userId,mapId")
    .eq("id", memoId)
    .maybeSingle();

  if (memoErr) throw memoErr;
  if (!memoData) return null;

  const memoRow = toMemoRow(memoData);

  // 2) Map
  const { data: mapData, error: mapErr } = await supabase
    .from("Map")
    .select("id,name,userId")
    .eq("id", memoRow.mapId)
    .maybeSingle();

  if (mapErr) throw mapErr;

  const map: MapType | undefined = mapData
    ? {
      id: toMapRow(mapData).id,
      name: toMapRow(mapData).name,
      userId: toMapRow(mapData).userId ?? undefined,
    }
    : undefined;

  // 3) Comments
  const { data: commentsData, error: commentsErr } = await supabase
    .from("Comment")
    .select("id,content,createdAt,memoId,userId")
    .eq("memoId", memoId)
    .order("createdAt", { ascending: false });

  if (commentsErr) throw commentsErr;

  const comments: Comment[] = (commentsData ?? []).map((row) => {
    const c = toCommentRow(row);
    return {
      id: c.id,
      content: c.content,
      createdAt: new Date(c.createdAt),
      memoId: c.memoId,
    };
  });

  // 4) Images
  const { data: imagesData, error: imagesErr } = await supabase
    .from("Image")
    .select("id,url,description,createdAt,memoId")
    .eq("memoId", memoId)
    .order("createdAt", { ascending: false });

  if (imagesErr) throw imagesErr;

  const images: Image[] = (imagesData ?? []).map((row) => {
    const img = toImageRow(row);
    return {
      id: img.id,
      url: img.url,
      description: img.description,
      memoId: img.memoId,
    };
  });

  // 5) Tags
  const { data: memoTagsData, error: memoTagsErr } = await supabase
    .from("MemoTag")
    .select("id,memoId,tagId")
    .eq("memoId", memoId);

  if (memoTagsErr) throw memoTagsErr;

  const memoTags = (memoTagsData ?? []).map((row) => toMemoTagRow(row));
  const tagIds = Array.from(new Set(memoTags.map((mt) => mt.tagId)));

  let tags: Tag[] = [];
  if (tagIds.length > 0) {
    const { data: tagsData, error: tagsErr } = await supabase
      .from("Tag")
      .select("id,name,userId")
      .in("id", tagIds);

    if (tagsErr) throw tagsErr;

    tags = (tagsData ?? []).map((row) => {
      const t = toTagRow(row);
      return { id: t.id, name: t.name };
    });
  }

  return {
    id: memoRow.id,
    title: memoRow.title,
    content: memoRow.content,
    createdAt: new Date(memoRow.createdAt),
    userId: memoRow.userId,
    mapId: memoRow.mapId,
    map,
    comments,
    images,
    tags,
  };
}

export async function fetchAllForUser(userId: string): Promise<{ maps: MapType[]; memos: Memo[] }> {
  // 1) Maps
  const { data: mapsData, error: mapsErr } = await supabase
    .from("Map")
    .select("id,name,userId")
    .eq("userId", userId)
    .order("name", { ascending: true });

  if (mapsErr) throw mapsErr;

  const maps: MapType[] = (mapsData ?? []).map((row) => {
    const m = toMapRow(row);
    return { id: m.id, name: m.name, userId: m.userId ?? undefined };
  });

  const mapById = new Map<string, MapType>(maps.map((m) => [m.id, m]));

  // 2) Memos
  const { data: memosData, error: memosErr } = await supabase
    .from("Memo")
    .select("id,title,content,createdAt,userId,mapId")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (memosErr) throw memosErr;

  const memoRows: MemoRow[] = (memosData ?? []).map(toMemoRow);
  const memoIds = memoRows.map((m) => m.id);

  if (memoIds.length === 0) return { maps, memos: [] };

  // 3) Comments
  const { data: commentsData, error: commentsErr } = await supabase
    .from("Comment")
    .select("id,content,createdAt,memoId,userId")
    .in("memoId", memoIds);

  if (commentsErr) throw commentsErr;

  const commentsByMemo = new Map<string, Comment[]>();
  for (const row of commentsData ?? []) {
    const c = toCommentRow(row);
    const arr = commentsByMemo.get(c.memoId) ?? [];
    arr.push({
      id: c.id,
      content: c.content,
      createdAt: new Date(c.createdAt),
      memoId: c.memoId,
    });
    commentsByMemo.set(c.memoId, arr);
  }

  // 4) Images
  const { data: imagesData, error: imagesErr } = await supabase
    .from("Image")
    .select("id,url,description,createdAt,memoId")
    .in("memoId", memoIds);

  if (imagesErr) throw imagesErr;

  const imagesByMemo = new Map<string, Image[]>();
  for (const row of imagesData ?? []) {
    const img = toImageRow(row);
    const arr = imagesByMemo.get(img.memoId) ?? [];
    arr.push({
      id: img.id,
      url: img.url,
      description: img.description,
      memoId: img.memoId,
    });
    imagesByMemo.set(img.memoId, arr);
  }

  // 5) Tags
  const { data: memoTagsData, error: memoTagsErr } = await supabase
    .from("MemoTag")
    .select("id,memoId,tagId")
    .in("memoId", memoIds);

  if (memoTagsErr) throw memoTagsErr;

  const memoTags = (memoTagsData ?? []).map(toMemoTagRow);
  const tagIds = Array.from(new Set(memoTags.map((mt) => mt.tagId)));

  const tagById = new Map<string, Tag>();
  if (tagIds.length > 0) {
    const { data: tagsData, error: tagsErr } = await supabase
      .from("Tag")
      .select("id,name,userId")
      .in("id", tagIds);

    if (tagsErr) throw tagsErr;

    for (const row of tagsData ?? []) {
      const t = toTagRow(row);
      tagById.set(t.id, { id: t.id, name: t.name });
    }
  }

  const tagsByMemo = new Map<string, Tag[]>();
  for (const mt of memoTags) {
    const tag = tagById.get(mt.tagId);
    if (!tag) continue;
    const arr = tagsByMemo.get(mt.memoId) ?? [];
    arr.push(tag);
    tagsByMemo.set(mt.memoId, arr);
  }

  const memos: Memo[] = memoRows.map((m) => ({
    id: m.id,
    title: m.title,
    content: m.content,
    createdAt: new Date(m.createdAt),
    userId: m.userId,
    mapId: m.mapId,
    map: mapById.get(m.mapId),
    comments: commentsByMemo.get(m.id) ?? [],
    images: imagesByMemo.get(m.id) ?? [],
    tags: tagsByMemo.get(m.id) ?? [],
  }));

  return { maps, memos };
}


export async function createMemo(input: {
  userId: string;
  mapId: string;
  title: string;
  content: string | null;
}): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("Memo")
    .insert([input])
    .select("id")
    .single<{ id: string }>();

  if (error) throw error;
  if (!data) throw new Error("No memo returned");

  return { id: data.id };
}
export async function deleteMemoById(memoId: string): Promise<void> {
  const { error } = await supabase.from("Memo").delete().eq("id", memoId);
  if (error) throw error;
}



export async function updateMemoById(
  memoId: string,
  input: { title: string; content: string | null },
): Promise<void> {
  const { error } = await supabase
    .from("Memo")
    .update(input)
    .eq("id", memoId);

  if (error) throw error;
}

export async function countMemosForMap(mapId: string): Promise<number> {
  const { count, error } = await supabase
    .from("Memo")
    .select("id", { count: "exact", head: true })
    .eq("mapId", mapId);

  if (error) throw error;
  return count ?? 0;
}
