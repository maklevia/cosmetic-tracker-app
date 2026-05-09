import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useEffect, useState, useRef } from "react";
import { getToken, initStorage } from "@/utils/storage";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isStorageReady, setIsStorageReady] = useState(false);
  const lastRedirect = useRef<string | null>(null);

  // 1. Initialize storage from device
  useEffect(() => {
    initStorage().then(() => {
      setIsStorageReady(true);
    });
  }, []);

  // 2. Auth redirection logic
  useEffect(() => {
    // Wait for BOTH navigation and storage to be ready
    if (!navigationState?.key || !isStorageReady) return;

    const token = getToken();
    const currentRoute = segments[0];
    const inAuthGroup = currentRoute === "(tabs)" || 
                        currentRoute === "product-details" || 
                        currentRoute === "profile" ||
                        currentRoute === "add-product";

    // Defer the navigation to ensure the navigator is fully mounted
    const timeout = setTimeout(() => {
      if (!token && inAuthGroup) {
        if (lastRedirect.current !== "login") {
            lastRedirect.current = "login";
            router.replace("/login");
        }
      } else if (token && (currentRoute === "login" || currentRoute === "signup" || currentRoute === undefined)) {
        if (lastRedirect.current !== "(tabs)") {
            lastRedirect.current = "(tabs)";
            router.replace("/(tabs)");
        }
      }
    }, 1);

    return () => clearTimeout(timeout);
  }, [segments, navigationState?.key, isStorageReady]);


  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* ... rest of screens ... */}
        <Stack.Screen 
          name="product-details" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="edit-product" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="add-review" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="add-product" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="change-password" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </GluestackUIProvider>
  );
}
