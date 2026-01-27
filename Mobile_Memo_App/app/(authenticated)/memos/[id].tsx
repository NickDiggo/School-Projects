// app/(authenticated)/memos/[id].tsx
import { useCallback, useMemo, useState } from "react";
import {ActivityIndicator, Alert, Image, Modal, Pressable, ScrollView, Text, TextInput, useColorScheme, useWindowDimensions, View,} from "react-native";
import {Stack, useFocusEffect, useLocalSearchParams, useRouter,} from "expo-router";
import { Pencil, Plus, Trash2, X } from "lucide-react-native";

import {Gesture, GestureDetector, GestureHandlerRootView,} from "react-native-gesture-handler";
import Animated, {runOnJS, useSharedValue, withTiming,} from "react-native-reanimated";

import { fetchMemoById, deleteMemoById } from "@/data/memoQueries";
import { addComment, deleteComment } from "@/data/commentQueries";
import { addImage, deleteImage } from "@/data/imageQueries";
import { uploadImageToSupabase } from "@/data/imageUpload";
import { useAuth } from "@/hooks/useAuth";
import type { Memo } from "@/models/types";
import { CameraUI } from "@/components/custom/cameraUI";

const BLACK = "#000000";
type Direction = "prev" | "next";

export default function MemoDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuth();
  const { width } = useWindowDimensions();

  const isDark = useColorScheme() === "dark";
  const iconOnPage = isDark ? "white" : "black";

  const memoId = id;

  const [loading, setLoading] = useState(true);
  const [memo, setMemo] = useState<Memo | null>(null);

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [viewCommentModalOpen, setViewCommentModalOpen] = useState(false);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);

  const [showCamera, setShowCamera] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Reanimated state for swipe in modal
  const xOffset = useSharedValue(0);
  const startX = useSharedValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const load = useCallback(async () => {
    if (!memoId) return;

    setLoading(true);
    const m = await fetchMemoById(memoId);
    setMemo(m);
    setLoading(false);
  }, [memoId]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const comments = memo?.comments ?? [];
  const images = memo?.images ?? [];

  const openCommentModal = (index: number) => {
    setSelectedCommentIndex(index);
    setViewCommentModalOpen(true);
  };
  const closeCommentModal = () => setViewCommentModalOpen(false);

  const goPrevComment = () =>
    setSelectedCommentIndex((i) => Math.max(0, i - 1));
  const goNextComment = () =>
    setSelectedCommentIndex((i) => Math.min(comments.length - 1, i + 1));

  const openImageModal = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      xOffset.value = 0;
      setImageModalOpen(true);
    },
    [xOffset],
  );

  const closeImageModal = useCallback(() => {
    setImageModalOpen(false);
    xOffset.value = 0;
  }, [xOffset]);

  const handleAddComment = useCallback(async () => {
    const text = commentText.trim();
    if (!text) return Alert.alert("Oops", "Typ eerst een opmerking.");
    if (!userId) return Alert.alert("Oops", "Geen userId geselecteerd.");
    if (!memo) return;

    await addComment({ memoId: memo.id, userId, content: text });
    setCommentText("");
    setCommentModalOpen(false);
    await load();
  }, [commentText, userId, memo, load]);

  const handleUploadPhotoToMemo = useCallback(
    async (fileUri: string) => {
      if (!memo) return;

      setUploadingImage(true);
      const { publicUrl } = await uploadImageToSupabase({ fileUri });
      await addImage({ memoId: memo.id, url: publicUrl });
      await load();
      setUploadingImage(false);
    },
    [memo, load],
  );

  // ---------- Delete actions ----------
  const confirmDeleteComment = useCallback(
    (commentId: string) => {
      Alert.alert(
        "Opmerking verwijderen?",
        "Ben je zeker dat je deze opmerking wil verwijderen?",
        [
          { text: "Annuleren", style: "cancel" },
          {
            text: "Verwijderen",
            style: "destructive",
            onPress: async () => {
              await deleteComment(commentId);
              await load();
            },
          },
        ],
      );
    },
    [load],
  );

  const confirmDeleteImage = useCallback(
    (imageId: string) => {
      Alert.alert(
        "Afbeelding verwijderen?",
        "Ben je zeker dat je deze afbeelding wil verwijderen?",
        [
          { text: "Annuleren", style: "cancel" },
          {
            text: "Verwijderen",
            style: "destructive",
            onPress: async () => {
              await deleteImage(imageId);
              setImageModalOpen(false);
              await load();
            },
          },
        ],
      );
    },
    [load],
  );

  const confirmDeleteMemo = useCallback(() => {
    if (!memo) return;

    Alert.alert(
      "Memo verwijderen?",
      "Ben je zeker? Dit verwijdert ook alle opmerkingen, tags en afbeeldingen van deze memo.",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            await deleteMemoById(memo.id);
            router.replace("/(authenticated)/memos");
          },
        },
      ],
    );
  }, [memo, router]);

  // ---------- Swipe logic in modal ----------
  const rubberBand = (translation: number, atEdge: boolean) => {
    "worklet";
    return atEdge ? translation * 0.35 : translation;
  };

  const goToIndex = useCallback((nextIndex: number) => {
    setSelectedImageIndex(nextIndex);
  }, []);

  const resetToCenter = useCallback(() => {
    xOffset.value = withTiming(0, { duration: 120 });
  }, [xOffset]);

  const animateAndGo = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;
      if (images.length === 0) return;

      const isFirst = selectedImageIndex === 0;
      const isLast = selectedImageIndex === images.length - 1;

      if (direction === "prev" && isFirst) return resetToCenter();
      if (direction === "next" && isLast) return resetToCenter();

      setIsAnimating(true);

      const to = direction === "next" ? -width : width;

      xOffset.value = withTiming(to, { duration: 180 }, (finished) => {
        if (!finished) return;

        const nextIndex =
          direction === "next"
            ? selectedImageIndex + 1
            : selectedImageIndex - 1;

        runOnJS(goToIndex)(nextIndex);

        xOffset.value = direction === "next" ? width : -width;
        xOffset.value = withTiming(0, { duration: 180 }, (done) => {
          if (done) runOnJS(setIsAnimating)(false);
        });
      });
    },
    [
      images.length,
      selectedImageIndex,
      width,
      xOffset,
      goToIndex,
      resetToCenter,
      isAnimating,
    ],
  );

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .enabled(imageModalOpen && !isAnimating)
      .onBegin(() => {
        startX.value = xOffset.value;
      })
      .onUpdate((e) => {
        const isFirst = selectedImageIndex === 0;
        const isLast = selectedImageIndex === images.length - 1;

        const atLeftEdge = isFirst && e.translationX > 0;
        const atRightEdge = isLast && e.translationX < 0;

        xOffset.value =
          startX.value +
          rubberBand(e.translationX, atLeftEdge || atRightEdge);
      })
      .onEnd((e) => {
        const threshold = width * 0.22;
        const flingVelocity = 900;

        const canGoPrev = selectedImageIndex > 0;
        const canGoNext = selectedImageIndex < images.length - 1;

        const goPrevByDistance = e.translationX > threshold && canGoPrev;
        const goNextByDistance = e.translationX < -threshold && canGoNext;

        const goPrevBySpeed = e.velocityX > flingVelocity && canGoPrev;
        const goNextBySpeed = e.velocityX < -flingVelocity && canGoNext;

        if (goPrevByDistance || goPrevBySpeed)
          return runOnJS(animateAndGo)("prev");
        if (goNextByDistance || goNextBySpeed)
          return runOnJS(animateAndGo)("next");

        runOnJS(resetToCenter)();
      })
      .activeOffsetX([-10, 10]);
  }, [
    animateAndGo,
    imageModalOpen,
    images.length,
    isAnimating,
    resetToCenter,
    selectedImageIndex,
    startX,
    width,
    xOffset,
  ]);

  const longPressImageGesture = useMemo(() => {
    return Gesture.LongPress()
      .minDuration(2000)
      .onEnd((_e, success) => {
        if (!success) return;
        const current = images[selectedImageIndex];
        if (!current) return;
        runOnJS(confirmDeleteImage)(current.id);
      });
  }, [images, selectedImageIndex, confirmDeleteImage]);

  const modalGesture = useMemo(() => {
    return Gesture.Simultaneous(panGesture, longPressImageGesture);
  }, [panGesture, longPressImageGesture]);

  const makeCommentLongPress = useCallback(
    (commentId: string) =>
      Gesture.LongPress()
        .minDuration(2000)
        .onEnd((_e, success) => {
          if (success) runOnJS(confirmDeleteComment)(commentId);
        }),
    [confirmDeleteComment],
  );

  const makeImageLongPress = useCallback(
    (imageId: string) =>
      Gesture.LongPress()
        .minDuration(2000)
        .onEnd((_e, success) => {
          if (success) runOnJS(confirmDeleteImage)(imageId);
        }),
    [confirmDeleteImage],
  );

  // ---------- Render ----------
  if (loading) {
    return (
      <View className="flex-1 bg-white dark:bg-black items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!memo) {
    return (
      <View className="flex-1 bg-white dark:bg-black items-center justify-center">
        <Text className="text-black dark:text-white">Memo niet gevonden</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Memo",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() =>
                  router.push(`/(authenticated)/memos/${memo.id}/edit`)
                }
                style={{ paddingHorizontal: 10 }}
              >
                <Pencil size={18} color={BLACK} />
              </Pressable>
              <Pressable
                onPress={confirmDeleteMemo}
                style={{ paddingHorizontal: 10 }}
              >
                <Trash2 size={18} color={BLACK} />
              </Pressable>
            </View>
          ),
        }}
      />

      <CameraUI
        showCamera={showCamera}
        cameraType="back"
        onClose={(photo) => {
          setShowCamera(false);
          if (photo?.path) void handleUploadPhotoToMemo(photo.path);
        }}
      />

      <ScrollView className="flex-1 bg-white dark:bg-black px-4 py-6">
        {/* Title + content card */}
        <View className="border border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10 rounded-2xl p-4 mb-4">
          <Text className="text-black dark:text-white text-2xl font-bold mb-2">
            {memo.title}
          </Text>
          {memo.content ? (
            <Text className="text-black/70 dark:text-white/80">
              {memo.content}
            </Text>
          ) : null}
        </View>

        {/* Afbeeldingen + toevoegen */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-black dark:text-white text-lg font-semibold">
              Afbeeldingen ({images.length})
            </Text>

            <Pressable
              onPress={() => setShowCamera(true)}
              disabled={uploadingImage}
              className="bg-gold px-3 py-2 rounded-full flex-row items-center active:opacity-80"
              style={uploadingImage ? { opacity: 0.6 } : { gap: 8 }}
            >
              <Plus size={16} color={BLACK} />
              <Text className="text-black font-extrabold">
                {uploadingImage ? "Bezig..." : "Toevoegen"}
              </Text>
            </Pressable>
          </View>

          {images.length === 0 ? (
            <Text className="text-black/60 dark:text-white/60 italic">
              Nog geen afbeeldingen.
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {images.map((img, index) => {
                const tapGesture = Gesture.Tap().onEnd((_e, success) => {
                  if (!success) return;
                  runOnJS(openImageModal)(index);
                });

                const longPressGesture = makeImageLongPress(img.id);
                const combined = Gesture.Simultaneous(
                  tapGesture,
                  longPressGesture,
                );

                return (
                  <GestureDetector key={img.id} gesture={combined}>
                    <View>
                      <Image
                        source={{ uri: img.url }}
                        style={{ width: 160, height: 96, borderRadius: 12 }}
                        resizeMode="cover"
                      />
                    </View>
                  </GestureDetector>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Comments card */}
        <View className="border border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-black dark:text-white text-lg font-semibold">
              Opmerkingen ({comments.length})
            </Text>

            <Pressable
              onPress={() => setCommentModalOpen(true)}
              className="bg-gold px-3 py-2 rounded-full active:opacity-80"
            >
              <Text className="text-black font-extrabold">+ Opmerking</Text>
            </Pressable>
          </View>

          {comments.length === 0 ? (
            <Text className="text-black/60 dark:text-white/60 italic">
              Nog geen opmerkingen.
            </Text>
          ) : (
            <View className="gap-2">
              {comments.map((c, index) => {
                const tapGesture = Gesture.Tap().onEnd((_e, success) => {
                  if (success) runOnJS(openCommentModal)(index);
                });

                const longPressGesture = makeCommentLongPress(c.id);
                const combined = Gesture.Simultaneous(
                  tapGesture,
                  longPressGesture,
                );

                return (
                  <GestureDetector key={c.id} gesture={combined}>
                    <View className="border border-black/15 dark:border-white/30 rounded-2xl p-3 bg-white/70 dark:bg-black/20">
                      <Text className="text-black dark:text-white">
                        {c.content}
                      </Text>
                      <Text className="text-black/50 dark:text-white/60 text-xs mt-2">
                        {new Date(c.createdAt).toLocaleDateString("nl-NL")}
                      </Text>
                    </View>
                  </GestureDetector>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Comment modal */}
      <Modal
        transparent
        visible={commentModalOpen}
        animationType="fade"
        onRequestClose={() => setCommentModalOpen(false)}
      >
        <View className="flex-1 bg-black/70 items-center justify-center px-4">
          <View className="w-full border border-black/20 dark:border-white/30 bg-white dark:bg-black rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-black dark:text-white text-lg font-semibold">
                Nieuwe opmerking
              </Text>

              <Pressable
                onPress={() => setCommentModalOpen(false)}
                className="p-2"
              >
                <X size={18} color={iconOnPage} />
              </Pressable>
            </View>

            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Typ je opmerking..."
              placeholderTextColor={
                isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"
              }
              multiline
              textAlignVertical="top"
              className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 text-black dark:text-white min-h-[110px]"
            />

            <View className="flex-row mt-4" style={{ gap: 10 }}>
              <Pressable
                onPress={() => setCommentModalOpen(false)}
                className="flex-1 border border-black/20 dark:border-white/30 rounded-2xl py-3 items-center"
              >
                <Text className="text-black dark:text-white font-semibold">
                  Annuleren
                </Text>
              </Pressable>

              <Pressable
                onPress={handleAddComment}
                className="flex-1 bg-gold rounded-2xl py-3 items-center active:opacity-80"
              >
                <Text className="text-black font-extrabold">Opslaan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image modal */}
      <Modal
        transparent
        visible={imageModalOpen}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.92)" }}
        >
          <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
            <Text className="text-white font-semibold">
              {images.length > 0
                ? `${selectedImageIndex + 1} / ${images.length}`
                : ""}
            </Text>

            <Pressable onPress={closeImageModal} className="p-2">
              <X size={22} color="white" />
            </Pressable>
          </View>

          <GestureDetector gesture={modalGesture}>
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: xOffset }] }}
            >
              <View className="flex-1 items-center justify-center px-4">
                {images[selectedImageIndex] ? (
                  <Image
                    source={{ uri: images[selectedImageIndex].url }}
                    style={{ width: "100%", height: "80%" }}
                    resizeMode="contain"
                  />
                ) : null}
              </View>
            </Animated.View>
          </GestureDetector>

          {images.length > 1 ? (
            <View className="flex-row gap-3 px-4 pb-10">
              <Pressable
                onPress={() => animateAndGo("prev")}
                disabled={selectedImageIndex === 0}
                className="flex-1 border border-white/50 rounded-2xl py-3 items-center"
                style={{ opacity: selectedImageIndex === 0 ? 0.4 : 1 }}
              >
                <Text className="text-white">Vorige</Text>
              </Pressable>

              <Pressable
                onPress={() => animateAndGo("next")}
                disabled={selectedImageIndex === images.length - 1}
                className="flex-1 border border-white/50 rounded-2xl py-3 items-center"
                style={{
                  opacity:
                    selectedImageIndex === images.length - 1 ? 0.4 : 1,
                }}
              >
                <Text className="text-white">Volgende</Text>
              </Pressable>
            </View>
          ) : null}
        </GestureHandlerRootView>
      </Modal>

      {/* View comment modal */}
      <Modal
        transparent
        visible={viewCommentModalOpen}
        animationType="fade"
        onRequestClose={closeCommentModal}
      >
        <View className="flex-1 bg-black/90">
          <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
            <Text className="text-white font-semibold">
              {comments.length > 0
                ? `${selectedCommentIndex + 1} / ${comments.length}`
                : ""}
            </Text>

            <Pressable onPress={closeCommentModal} className="p-2">
              <X size={22} color="white" />
            </Pressable>
          </View>

          <View className="flex-1 px-4 justify-center">
            {comments[selectedCommentIndex] ? (
              <View className="border border-white/40 bg-black/20 rounded-2xl p-4">
                <Text className="text-white text-lg font-semibold mb-2">
                  Opmerking
                </Text>
                <Text className="text-white/90">
                  {comments[selectedCommentIndex].content}
                </Text>
                <Text className="text-white/60 text-xs mt-3">
                  {new Date(comments[selectedCommentIndex].createdAt).toLocaleString(
                    "nl-NL",
                  )}
                </Text>
              </View>
            ) : null}
          </View>

          {comments.length > 1 ? (
            <View className="flex-row gap-3 px-4 pb-10">
              <Pressable
                onPress={goPrevComment}
                disabled={selectedCommentIndex === 0}
                className="flex-1 border border-white/50 rounded-2xl py-3 items-center"
                style={{ opacity: selectedCommentIndex === 0 ? 0.4 : 1 }}
              >
                <Text className="text-white">Vorige</Text>
              </Pressable>

              <Pressable
                onPress={goNextComment}
                disabled={selectedCommentIndex === comments.length - 1}
                className="flex-1 border border-white/50 rounded-2xl py-3 items-center"
                style={{
                  opacity:
                    selectedCommentIndex === comments.length - 1 ? 0.4 : 1,
                }}
              >
                <Text className="text-white">Volgende</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </Modal>
    </>
  );
}
