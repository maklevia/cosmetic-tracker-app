import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabsLayout() {
  const brandPink900 = "#831843";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brandPink900,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#FCE7F3",
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="add-placeholder"
        options={{
          title: "Add product",
          tabBarIcon: ({ color, size }) => (
            <View className="bg-brand-pink-900 w-12 h-12 rounded-full items-center justify-center -mt-8 shadow-lg">
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("add-product");
          },
        })}
      />

      <Tabs.Screen
        name="allProducts"
        options={{
          title: "My products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="archive"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
