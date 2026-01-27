// app/(authenticated)/memos/index.tsx
import { useCallback, useState } from "react";
import {ActivityIndicator, Pressable, ScrollView, Text, View,} from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { Plus, Settings } from "lucide-react-native";

import MemoCard from "@/components/custom/memo-card";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllForUser } from "@/data/memoQueries";
import type { Map, Memo } from "@/models/types";

const BLACK = "#000000";

export default function MemosIndex() {
  const router = useRouter();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState<Map[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);

  const load = useCallback(async (): Promise<void> => {
    if (!userId) return;

    setLoading(true);
    const res = await fetchAllForUser(userId);
    setMaps(res.maps);
    setMemos(res.memos);
    setLoading(false);
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => router.push("/(authenticated)/memos/settings")}
                style={{ paddingHorizontal: 10, paddingVertical: 6 }}
              >
                <Settings size={20} color={BLACK} />
              </Pressable>

              <Pressable
                onPress={() => router.push("/(authenticated)/memos/new")}
                style={{ paddingHorizontal: 10, paddingVertical: 6 }}
              >
                <Plus size={20} color={BLACK} />
              </Pressable>
            </View>
          ),
        }}
      />

      <View className="flex-1 bg-white dark:bg-black">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text className="text-black dark:text-white text-3xl font-black mb-6">
              Memo&apos;s
            </Text>

            {maps.map((map) => {
              const memosForMap = memos.filter((m) => m.mapId === map.id);

              return (
                <View key={map.id} className="mb-8">
                  <View className="flex-row items-end justify-between mb-3">
                    <Text className="text-black dark:text-white text-lg font-extrabold">
                      {map.name}
                    </Text>
                    <Text className="text-black/60 dark:text-white/70 text-sm">
                      {memosForMap.length}
                    </Text>
                  </View>

                  {memosForMap.length === 0 ? (
                    <Text className="text-black/60 dark:text-white/70 italic">
                      Geen memo&apos;s in deze map.
                    </Text>
                  ) : (
                    <View className="gap-3">
                      {memosForMap.map((memo) => (
                        <MemoCard key={memo.id} memo={memo} />
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
}
