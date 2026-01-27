// app/(auth)/register.tsx
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async (): Promise<void> => {
    const cleanEmail = email.trim().toLowerCase();
    const p1 = password;
    const p2 = confirmPassword;

    if (!cleanEmail) return Alert.alert("Oops", "Vul een email in.");
    if (p1.length < 6)
      return Alert.alert("Oops", "Wachtwoord moet minstens 6 karakters zijn.");
    if (p1 !== p2)
      return Alert.alert("Oops", "Wachtwoorden komen niet overeen.");

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password: p1,
    });

    if (signUpError) {
      setLoading(false);
      Alert.alert("Register failed", signUpError.message);
      return;
    }

    // na register niet ingelogd blijven: supa logt voor een of andere reden altijd in na register
    const { error: signOutError } = await supabase.auth.signOut();

    setLoading(false);

    if (signOutError) {
      Alert.alert("Register failed", signOutError.message);
      return;
    }

    Alert.alert("Account aangemaakt", "Je kan nu inloggen.");
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white dark:bg-black">
      <Text className="text-2xl font-black mb-4 text-black dark:text-white">
        Register
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 mb-3 text-black dark:text-white"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password (min 6)"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        textContentType="newPassword"
        className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 mb-3 text-black dark:text-white"
      />

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="confirm password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        textContentType="newPassword"
        className="border border-black/20 dark:border-white/25 bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-3 mb-4 text-black dark:text-white"
      />

      <Pressable
        onPress={() => void onRegister()}
        disabled={loading}
        className="rounded-2xl px-4 py-3 border border-gold/60 bg-gold/20 active:opacity-80"
        style={loading ? { opacity: 0.6 } : undefined}
      >
        <Text className="text-center font-black text-gold">
          {loading ? "Bezig..." : "Registreren"}
        </Text>
      </Pressable>
    </View>
  );
}
