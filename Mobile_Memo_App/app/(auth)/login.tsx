// app/(auth)/login.tsx
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (): Promise<void> => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error.message);
      return;
    }

    router.replace("/(authenticated)/memos");
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white dark:bg-black">
      <Text className="text-2xl font-black mb-4 text-black dark:text-white">
        Login
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 mb-3 text-black dark:text-white"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 mb-4 text-black dark:text-white"
      />

      <Pressable
        onPress={() => void onLogin()}
        disabled={loading}
        className="rounded-2xl px-4 py-3 border border-gold/60 bg-gold/20 active:opacity-80"
        style={loading ? { opacity: 0.6 } : undefined}
      >
        <Text className="text-center font-black text-gold">
          {loading ? "Bezig..." : "Inloggen"}
        </Text>
      </Pressable>
    </View>
  );
}
