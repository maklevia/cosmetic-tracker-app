import { SafeAreaView } from "react-native-safe-area-context";
import { CollectionScreen } from "@/components/CollectionScreen/CollectionScreen";

export default function AllProductsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-pink-50" edges={['top']}>
      <CollectionScreen />
    </SafeAreaView>
  );
}
