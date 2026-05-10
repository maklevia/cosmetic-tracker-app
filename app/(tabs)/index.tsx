import { SafeAreaView } from "react-native-safe-area-context";
import { MainScreen } from "@/components/MainScreen/MainScreen";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <MainScreen />
    </SafeAreaView>
  );
}
