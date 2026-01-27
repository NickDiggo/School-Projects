//app/(auth)/_layout.tsx
import { Tabs } from "expo-router";
import { LogIn, UserPlus } from "lucide-react-native";

const GOLD = "#FFD700";
const BLACK = "#000000";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: GOLD },
        headerTintColor: BLACK,
        headerTitleStyle: { color: BLACK, fontWeight: "800", fontSize: 20 },
        headerTitleAlign: "center",

        tabBarStyle: { backgroundColor: "#C0C0C0", borderTopColor: "rgba(255,255,255,0.15)" },
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => <LogIn color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, size }) => <UserPlus color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
