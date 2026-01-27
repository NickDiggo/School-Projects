// app/(authenticated)/memos/settings/index.tsx
import { useCallback, useMemo, useState } from "react";
import {ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, View,} from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Plus, X } from "lucide-react-native";

import { useAuth } from "@/hooks/useAuth";
import type { Map, Tag } from "@/models/types";
import {fetchMapsForUser, createMap, renameMap, deleteMapSafe,} from "@/data/mapQueries";
import {fetchTagsForUser, createTag, renameTag,
  deleteTag,} from "@/data/tagQueries";

const BLACK = "#000000";

type EditType = "map" | "tag";
type EditMode = "add" | "edit";

type EditState =
  | { open: false }
  | {
  open: true;
  type: EditType;
  mode: EditMode;
  id?: string;
  initialName?: string;
};

function Pill({ label, onLongPress }: { label: string; onLongPress: () => void }) {
  const longPress = useMemo(
    () =>
      Gesture.LongPress()
        .minDuration(2000)
        .onEnd((_e, success) => {
          if (success) runOnJS(onLongPress)();
        }),
    [onLongPress],
  );

  return (
    <GestureDetector gesture={longPress}>
      <View className="px-3 py-2 rounded-full border border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10">
        <Text className="text-black dark:text-white font-bold">{label}</Text>
      </View>
    </GestureDetector>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { userId, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState<Map[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [edit, setEdit] = useState<EditState>({ open: false });
  const [name, setName] = useState("");

  const handleLogout = () => {
    Alert.alert("Uitloggen", "Weet je zeker dat je wil uitloggen?", [
      { text: "Annuleren", style: "cancel" },
      {
        text: "Uitloggen",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };
  //oude code nieuwe code heeft gewerkt met alleen useEffect
 //----elke keer dat de pagina opnieuw in focus komt van de pop up
  const load = useCallback(async (): Promise<void> => {
    if (!userId) return;

    setLoading(true);

    const [dbMaps, dbTags] = await Promise.all([
      fetchMapsForUser(userId),
      fetchTagsForUser(userId),
    ]);

    setMaps(dbMaps);
    setTags(dbTags);
    setLoading(false);
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  // ---------- helpers ----------
  const openAdd = (type: EditType) => {
    setName("");
    setEdit({ open: true, type, mode: "add" });
  };

  const openEdit = (type: EditType, id: string, initialName: string) => {
    setName(initialName);
    setEdit({ open: true, type, mode: "edit", id, initialName });
  };

  const closeModal = () => {
    setEdit({ open: false });
    setName("");
  };

  const save = async (): Promise<void> => {
    const trimmed = name.trim();
    if (!trimmed) return Alert.alert("Oops", "Geef een naam in.");
    if (!userId || !edit.open) return;

    if (edit.type === "map") {
      if (edit.mode === "add") await createMap({ userId, name: trimmed });
      else await renameMap({ mapId: edit.id!, name: trimmed });
    } else {
      if (edit.mode === "add") await createTag({ userId, name: trimmed });
      else await renameTag({ tagId: edit.id!, name: trimmed });
    }

    closeModal();
    await load();
  };

  const onLongPressMap = (m: Map) => {
    Alert.alert(m.name, "Wat wil je doen?", [
      { text: "Annuleren", style: "cancel" },
      { text: "Aanpassen", onPress: () => openEdit("map", m.id, m.name) },
      {
        text: "Verwijderen",
        style: "destructive",
        onPress: async () => {
          await deleteMapSafe({ mapId: m.id });
          await load();
        },
      },
    ]);
  };

  const onLongPressTag = (t: Tag) => {
    Alert.alert(t.name, "Wat wil je doen?", [
      { text: "Annuleren", style: "cancel" },
      { text: "Aanpassen", onPress: () => openEdit("tag", t.id, t.name) },
      {
        text: "Verwijderen",
        style: "destructive",
        onPress: async () => {
          await deleteTag({ tagId: t.id });
          await load();
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerRight: () => (
            <Pressable
              onPress={handleLogout}
              style={{ marginRight: 10 }}
              className="px-4 py-1.5 rounded-full border border-black/20 bg-black/5"
            >
              <Text style={{ color: BLACK, fontWeight: "900", fontSize: 13 }}>
                Logout
              </Text>
            </Pressable>
          ),
        }}
      />

      <View className="flex-1 bg-white dark:bg-black">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
            <Text className="text-black dark:text-white text-3xl font-black mb-4">
              Beheer
            </Text>

            {/* MAPS */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-black dark:text-white text-lg font-extrabold">
                  Mappen
                </Text>

                <Pressable
                  onPress={() => openAdd("map")}
                  className="bg-gold px-3 py-2 rounded-full flex-row items-center"
                  style={{ gap: 8 }}
                >
                  <Plus size={16} color={BLACK} />
                  <Text className="text-black font-black">Toevoegen</Text>
                </Pressable>
              </View>

              {maps.length === 0 ? (
                <Text className="text-black/60 dark:text-white/60 italic">
                  Nog geen mappen.
                </Text>
              ) : (
                <View className="flex-row flex-wrap" style={{ gap: 10 }}>
                  {maps.map((m) => (
                    <Pill key={m.id} label={m.name} onLongPress={() => onLongPressMap(m)} />
                  ))}
                </View>
              )}

              <Text className="text-black/55 dark:text-white/55 mt-3 text-xs">
                Tip: houd 2 seconden ingedrukt om aan te passen of te verwijderen.
              </Text>
            </View>

            {/* TAGS */}
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-black dark:text-white text-lg font-extrabold">
                  Tags
                </Text>

                <Pressable
                  onPress={() => openAdd("tag")}
                  className="bg-gold px-3 py-2 rounded-full flex-row items-center"
                  style={{ gap: 8 }}
                >
                  <Plus size={16} color={BLACK} />
                  <Text className="text-black font-black">Toevoegen</Text>
                </Pressable>
              </View>

              {tags.length === 0 ? (
                <Text className="text-black/60 dark:text-white/60 italic">
                  Nog geen tags.
                </Text>
              ) : (
                <View className="flex-row flex-wrap" style={{ gap: 10 }}>
                  {tags.map((t) => (
                    <Pill key={t.id} label={t.name} onLongPress={() => onLongPressTag(t)} />
                  ))}
                </View>
              )}

              <Text className="text-black/55 dark:text-white/55 mt-3 text-xs">
                Tip: houd 2 seconden ingedrukt om aan te passen of te verwijderen.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Modal voor add/edit */}
      <Modal transparent visible={edit.open} animationType="fade" onRequestClose={closeModal}>
        <View className="flex-1 bg-black/70 px-4 justify-center">
          <View className="border border-black/20 dark:border-white/30 bg-white dark:bg-black rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-black dark:text-white text-lg font-extrabold">
                {edit.open ? (edit.mode === "add" ? "Toevoegen" : "Aanpassen") : ""}{" "}
                {edit.open ? (edit.type === "map" ? "map" : "tag") : ""}
              </Text>

              <Pressable onPress={closeModal} className="p-2">
                <X size={18} color="white" />
              </Pressable>
            </View>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={edit.open && edit.type === "map" ? "Mapnaam..." : "Tagnaam..."}
              placeholderTextColor="rgba(0,0,0,0.45)"
              autoFocus
              className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white"
            />

            <View className="flex-row mt-4" style={{ gap: 10 }}>
              <Pressable
                onPress={closeModal}
                className="flex-1 border border-black/20 dark:border-white/30 rounded-2xl py-3 items-center"
              >
                <Text className="text-black dark:text-white font-semibold">Annuleren</Text>
              </Pressable>

              <Pressable
                onPress={() => void save()}
                className="flex-1 bg-gold rounded-2xl py-3 items-center"
              >
                <Text className="text-black font-black">Opslaan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
