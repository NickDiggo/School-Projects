// app/(authenticated)/memos/_layout.tsx
import { Stack } from 'expo-router'

const GOLD = '#FFD700'
const BLACK = '#000000'

export default function MemosLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: GOLD },
        headerTintColor: BLACK,
        headerTitleStyle: { color: BLACK, fontWeight: '800', fontSize: 20 },
        headerTitleAlign: 'center',
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Memo App' }} />
      <Stack.Screen name="[id]" options={{ title: 'Memo' }} />
      <Stack.Screen name="[id]/edit" options={{ title: 'Bewerk memo' }} />
      <Stack.Screen name="new" options={{ title: 'Nieuwe memo' }} />

    </Stack>
  )
}
