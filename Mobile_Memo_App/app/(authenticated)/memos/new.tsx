// app/(authenticated)/memos/new.tsx
import { useEffect, useMemo, useState } from "react";
import {ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, View, useColorScheme,} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { createMemo } from "@/data/memoQueries";
import { setTagsForMemo } from "@/data/memoTagQueries";
import { fetchMapsForUser } from "@/data/mapQueries";
import { fetchTagsForUser } from "@/data/tagQueries";

import type { Map, Tag } from "@/models/types";
import { useSpeechToText } from "@/hooks/useSpeechToText";

export default function NewMemoPage() {
  const router = useRouter();
  const { userId } = useAuth();

  const isDark = useColorScheme() === "dark";

  const [loading, setLoading] = useState(true);

  const [maps, setMaps] = useState<Map[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const selectedMap = useMemo(
    () => maps.find((m) => m.id === selectedMapId),
    [maps, selectedMapId],
  );
  const selectedTags = useMemo(
    () => tags.filter((t) => selectedTagIds.includes(t.id)),
    [tags, selectedTagIds],
  );

  const [sttOpen, setSttOpen] = useState(false);
  const stt = useSpeechToText({ lang: "nl-NL" });

  const applyStt = () => {
    const text = stt.transcript.trim();
    if (!text) return;

    setContent((prev) => (prev.trim() ? prev.trimEnd() + "\n" + text : text));
    setSttOpen(false);
  };

  const closeStt = () => {
    if (stt.recognizing) stt.abort();
    setSttOpen(false);
  };

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (!userId) {
        if (!cancelled) setLoading(false);
        return;
      }

      if (!cancelled) setLoading(true);

      const [dbMaps, dbTags] = await Promise.all([
        fetchMapsForUser(userId),
        fetchTagsForUser(userId),
      ]);

      if (cancelled) return;

      setMaps(dbMaps);
      setTags(dbTags);

      setSelectedMapId((prev) => {
        if (prev) return prev;
        return dbMaps.length > 0 ? dbMaps[0].id : null;
      });

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);


  const pickMap = (mapId: string) => {
    setSelectedMapId((prev) => (prev === mapId ? null : mapId));
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSave = async (): Promise<void> => {
    if (!userId) return Alert.alert("Oops", "Geen userId geselecteerd.");
    if (!title.trim()) return Alert.alert("Oops", "Geef een titel in.");
    if (!selectedMapId) return Alert.alert("Oops", "Kies 1 map.");

    const created = await createMemo({
      userId,
      mapId: selectedMapId,
      title: title.trim(),
      content: content.trim() ? content.trim() : null,
    });

    await setTagsForMemo({ memoId: created.id, tagIds: selectedTagIds });

    Alert.alert("Saved", "Nieuwe memo toegevoegd ✅");
    router.back();
  };


  if (loading) {
    return (
      <View className="flex-1 bg-white dark:bg-black items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  //
  // if (!userId) {
  //   return (
  //     <View className="flex-1 bg-white dark:bg-black items-center justify-center px-6">
  //       <Text className="text-black dark:text-white text-lg font-semibold mb-2">
  //         Niet ingelogd
  //       </Text>
  //       <Text className="text-black/60 dark:text-white/70 text-center">
  //         Kies eerst een userId op het login scherm.
  //       </Text>
  //     </View>
  //   );
  // }

  if (maps.length === 0) {
    return (
      <View className="flex-1 bg-white dark:bg-black items-center justify-center px-6">
        <Text className="text-black dark:text-white text-lg font-semibold mb-2">
          Geen mappen gevonden
        </Text>
        <Text className="text-black/60 dark:text-white/70 text-center">
          Er zijn nog geen mappen aangemaakt. Maak eerst een map aan in settings.
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="mt-6 active:opacity-80"
        >
          <View className="bg-gold rounded-2xl px-5 py-4">
            <Text className="text-black font-black text-center">Terug</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-white dark:bg-black"
        contentContainerStyle={{ padding: 16 }}
      >
        <Text className="text-black dark:text-white text-2xl font-black mb-4">
          Nieuwe memo
        </Text>

        <View className="border border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10 rounded-2xl p-4 mb-4">
          <Text className="text-black/70 dark:text-white/70 mb-2">Titel</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Bijv. Boodschappenlijst"
            placeholderTextColor={
              isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"
            }
            className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white mb-4"
          />

          {/* Content header + STT button */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-black/70 dark:text-white/70">Content</Text>

            <Pressable onPress={() => setSttOpen(true)} className="active:opacity-80">
              <View className="px-3 py-2 rounded-full border border-black/20 dark:border-white/30">
                <Text className="text-black dark:text-white">🎙️ Speech</Text>
              </View>
            </Pressable>
          </View>

          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Schrijf iets..."
            placeholderTextColor={
              isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"
            }
            multiline
            textAlignVertical="top"
            className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white min-h-[120px]"
          />
        </View>

        {/* Map select */}
        <View className="mb-4">
          <Text className="text-black dark:text-white text-lg font-extrabold mb-2">
            Map (max 1)
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {maps.map((m) => {
              const active = m.id === selectedMapId;

              return (
                <Pressable
                  key={m.id}
                  onPress={() => pickMap(m.id)}
                  className={[
                    "px-3 py-2 rounded-full border",
                    active
                      ? "bg-gold border-gold"
                      : "border-black/20 dark:border-white/40 bg-black/5 dark:bg-white/10",
                  ].join(" ")}
                >
                  <Text
                    className={
                      active
                        ? "text-black font-semibold"
                        : "text-black dark:text-white"
                    }
                  >
                    {m.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {selectedMap ? (
            <Text className="text-black/60 dark:text-white/70 mt-2">
              Geselecteerd:{" "}
              <Text className="text-black dark:text-white font-semibold">
                {selectedMap.name}
              </Text>
            </Text>
          ) : (
            <Text className="text-black/50 dark:text-white/50 mt-2">
              Geen map geselecteerd
            </Text>
          )}
        </View>

        {/* Tags multi */}
        <View className="mb-6">
          <Text className="text-black dark:text-white text-lg font-extrabold mb-2">
            Tags (meerdere)
          </Text>

          {tags.length === 0 ? (
            <Text className="text-black/50 dark:text-white/50">
              Geen tags gevonden
            </Text>
          ) : (
            <View className="flex-row flex-wrap gap-2">
              {tags.map((t) => {
                const active = selectedTagIds.includes(t.id);

                return (
                  <Pressable
                    key={t.id}
                    onPress={() => toggleTag(t.id)}
                    className={[
                      "px-3 py-2 rounded-full border",
                      active
                        ? "bg-black dark:bg-white border-black dark:border-white"
                        : "border-black/20 dark:border-white/40 bg-black/5 dark:bg-white/10",
                    ].join(" ")}
                  >
                    <Text
                      className={
                        active
                          ? "text-white dark:text-black font-semibold"
                          : "text-black dark:text-white"
                      }
                    >
                      {t.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <Text className="text-black/60 dark:text-white/70 mt-2">
            Geselecteerd:{" "}
            {selectedTags.length > 0
              ? selectedTags.map((t) => t.name).join(", ")
              : "geen"}
          </Text>
        </View>

        <Pressable
          onPress={handleSave}
          className="bg-gold rounded-2xl py-4 items-center active:opacity-80"
        >
          <Text className="text-black font-extrabold text-base">Opslaan</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          className="py-4 items-center active:opacity-80"
        >
          <Text className="text-black/60 dark:text-white/70">Annuleren</Text>
        </Pressable>
      </ScrollView>

      {/* STT Modal */}
      <Modal
        visible={sttOpen}
        transparent
        animationType="fade"
        onRequestClose={closeStt}
      >
        <View className="flex-1 bg-black/70 justify-center px-4">
          <View className="bg-white dark:bg-black border border-black/20 dark:border-white/30 rounded-2xl p-4">
            <Text className="text-black dark:text-white text-lg font-extrabold mb-3">
              Speech to text
            </Text>

            {!stt.canStart ? (
              <Text className="text-black/60 dark:text-white/70 mb-3">
                Speech recognition is niet beschikbaar op dit toestel/emulator.
              </Text>
            ) : null}

            {stt.error ? (
              <Text className="text-red-600 dark:text-red-400 mb-3">
                Error: {stt.error.code}
                {stt.error.message ? ` - ${stt.error.message}` : ""}
              </Text>
            ) : null}

            <View className="border border-black/20 dark:border-white/30 rounded-xl p-3 min-h-[90px] mb-3 bg-black/5 dark:bg-white/10">
              <Text className="text-black dark:text-white">
                {stt.transcript ||
                  (stt.recognizing ? "Luisteren..." : "Druk op Start en spreek")}
              </Text>
            </View>

            <View className="flex-row" style={{ gap: 10 }}>
              {!stt.recognizing ? (
                <Pressable
                  onPress={() => void stt.start()}
                  style={{ flex: 1 }}
                  disabled={!stt.canStart}
                >
                  <View
                    className={[
                      "rounded-2xl py-3",
                      stt.canStart ? "bg-gold" : "bg-black/10 dark:bg-white/20",
                    ].join(" ")}
                  >
                    <Text className="text-black font-black text-center">
                      Start
                    </Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable onPress={stt.stop} style={{ flex: 1 }}>
                  <View className="bg-red-500 rounded-2xl py-3">
                    <Text className="text-black font-black text-center">
                      Stop
                    </Text>
                  </View>
                </Pressable>
              )}

              <Pressable
                onPress={applyStt}
                style={{ flex: 1 }}
                disabled={!stt.transcript.trim()}
              >
                <View
                  className={[
                    "rounded-2xl py-3",
                    stt.transcript.trim()
                      ? "bg-black dark:bg-white"
                      : "bg-black/10 dark:bg-white/20",
                  ].join(" ")}
                >
                  <Text className="text-white dark:text-black font-black text-center">
                    Gebruik tekst
                  </Text>
                </View>
              </Pressable>
            </View>

            <Pressable onPress={closeStt} className="mt-3 active:opacity-80">
              <Text className="text-black/60 dark:text-white/70 text-center">
                Sluiten
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
