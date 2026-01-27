// app/(authenticated)/_layout.tsx
import { Stack } from 'expo-router'

export default function AuthenticatedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="memos" options={{ headerShown: false }} />
    </Stack>
  )
}
