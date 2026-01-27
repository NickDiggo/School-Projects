// app/(authenticated)/memos/[id]/edit.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { fetchMemoById, updateMemoById } from "@/data/memoQueries";

const BLACK = "#000000";

export default function EditMemoPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();



  const memoId = id;


  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (!memoId) return;

      setLoading(true);
      const memo = await fetchMemoById(memoId);

      if (!memo) {
        Alert.alert("Fout", "Memo niet gevonden");
        router.back();
        return;
      }

      setTitle(memo.title);
      setContent(memo.content ?? "");
      setLoading(false);
    };

    void run();
  }, [memoId, router]);

  const onSave = async (): Promise<void> => {
    if (!memoId) return;

    if (!title.trim()) {
      Alert.alert("Fout", "Titel is verplicht");
      return;
    }

    await updateMemoById(memoId, {
      title: title.trim(),
      content: content.trim() ? content.trim() : null,
    });

    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white dark:bg-black items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Bewerk memo",
          headerRight: () => (
            <Pressable onPress={() => void onSave()} style={{ paddingHorizontal: 14 }}>
              <Text style={{ color: BLACK, fontWeight: "800" }}>Opslaan</Text>
            </Pressable>
          ),
        }}
      />

      <View className="flex-1 bg-white dark:bg-black px-4 py-6">
        <Text className="text-black/70 dark:text-white/70 mb-2">Titel</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titel..."
          placeholderTextColor="rgba(0,0,0,0.45)"
          className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white mb-4"
        />

        <Text className="text-black/70 dark:text-white/70 mb-2">Inhoud</Text>

        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Schrijf iets..."
          placeholderTextColor="rgba(0,0,0,0.45)"
          multiline
          textAlignVertical="top"
          className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white min-h-[160px]"
        />

        <Pressable onPress={() => void onSave()} className="mt-6 active:opacity-80">
          <View className="bg-gold rounded-2xl py-4 items-center">
            <Text className="text-black font-black">Opslaan</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}
