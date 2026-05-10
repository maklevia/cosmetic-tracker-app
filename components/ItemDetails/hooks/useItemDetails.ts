import { useEffect, useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import productService, { Product } from "@/api/services/productService";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import { getDisplayData } from "@/utils/display";
import { getFullImageUrl } from "@/api/apiClient";
import { getUser } from "@/utils/storage";
import { ArchiveReason, ExpiryRelation } from "../components/ProductActions";
import { ItemDetailsHookData } from "../typedefs";

export const useItemDetails = (
  id?: string, 
  collectionItemId?: string,
  initialProduct?: Product,
  initialCollectionItem?: CollectionItem | null
): ItemDetailsHookData => {
  const router = useRouter();
  const currentUser = getUser();
  
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [collectionItem, setCollectionItem] = useState<CollectionItem | null>(initialCollectionItem || null);
  const [isLoading, setIsLoading] = useState(!initialProduct);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (collectionItemId) {
        const [collection, archivedCollection] = await Promise.all([
          collectionService.getByUser('active'),
          collectionService.getByUser('archived')
        ]);
        const fullCollection = [...collection, ...archivedCollection];
        
        const found = fullCollection.find(c => c.id === parseInt(collectionItemId));
        if (found) {
          setCollectionItem(found);
          setProduct(found.product as any);
        }
      } else if (id) {
        const data = await productService.getById(parseInt(id));
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to load product details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, collectionItemId]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const isArchived = useMemo(() => collectionItem?.itemStatus === 'archived', [collectionItem]);

  const userReview = useMemo(() => {
    const review = product?.reviews?.find(r => r.userId === currentUser?.id);
    return review ? { stars: review.scoreReview, text: review.textReview } : undefined;
  }, [product?.reviews, currentUser?.id]);

  const isExpired = useMemo(() => {
    if (!collectionItem?.openedDate || !collectionItem?.pao) return false;
    const opened = new Date(collectionItem.openedDate);
    const expires = new Date(opened);
    expires.setMonth(expires.getMonth() + collectionItem.pao);
    return expires < new Date();
  }, [collectionItem]);

  const displayData = useMemo(() => {
    if (!product) return null;
    return collectionItem ? getDisplayData(collectionItem) : {
      title: product.title,
      brand: product.brand,
      description: product.description,
      imageUrl: product.image?.path || product.image?.url || null
    };
  }, [collectionItem, product]);

  const imageUrl = useMemo(() => displayData ? getFullImageUrl(displayData.imageUrl) : null, [displayData]);

  const archiveText = useMemo(() => {
    if (!collectionItem || collectionItem.itemStatus !== 'archived') return null;
    if (collectionItem.archiveReason === 'ran_out') return "Reason: Ran out of product";
    if (collectionItem.archiveReason === 'expired') {
      const relationMap = {
        'in_time': 'in time',
        'before': 'before estimated date',
        'after': 'after estimated date'
      };
      const relation = collectionItem.expiryRelation ? (relationMap as any)[collectionItem.expiryRelation] : '';
      return `Reason: Expired ${relation}`;
    }
    return null;
  }, [collectionItem]);

  const handleEditPress = useCallback(() => {
    if (!product) return;
    router.push({
      pathname: "/edit-product",
      params: { id: product.id, collectionItemId: collectionItem?.id }
    });
  }, [router, product, collectionItem?.id]);

  const handleArchive = useCallback(async (reason: ArchiveReason, relation?: ExpiryRelation) => {
    if (!collectionItem) return;
    try {
      await collectionService.update(collectionItem.id, { 
        itemStatus: 'archived',
        archiveReason: reason,
        expiryRelation: relation
      });
      Alert.alert("Success", "Product archived");
      router.replace("/(tabs)/allProducts");
    } catch (error) {
      console.log("Failed to archive:", error);
      Alert.alert("Error", "Failed to archive product");
    }
  }, [collectionItem, router]);

  const handleUnarchive = useCallback(async () => {
    if (!collectionItem) return;
    try {
      await collectionService.update(collectionItem.id, { 
        itemStatus: 'active',
        archiveReason: null,
        expiryRelation: null
      });
      Alert.alert("Success", "Product moved to active collection");
      router.replace("/(tabs)/allProducts");
    } catch (error) {
      console.log("Failed to unarchive:", error);
      Alert.alert("Error", "Failed to unarchive product");
    }
  }, [collectionItem, router]);

  const handleDelete = useCallback(async () => {
    if (!collectionItem) return;
    Alert.alert(
      "Delete Product",
      "Are you sure you want to remove this product from your collection?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await collectionService.delete(collectionItem.id);
              router.replace("/(tabs)/allProducts");
            } catch (error) {
              console.log("Failed to delete:", error);
              Alert.alert("Error", "Failed to delete product");
            }
          }
        }
      ]
    );
  }, [collectionItem, router]);

  useEffect(() => {
    if (isExpired && !isArchived && product) {
      Alert.alert(
        "Product Expired!",
        `It looks like your ${product.title} has reached its recommended shelf life. What would you like to do?`,
        [
          { text: "Continue Using", style: "cancel" },
          { 
            text: "Archive Product", 
            onPress: () => handleArchive('expired', 'after') 
          }
        ]
      );
    }
  }, [isExpired, isArchived, product, handleArchive]);

  return {
    product,
    collectionItem,
    isLoading,
    isArchived,
    isExpired,
    userReview,
    displayData,
    imageUrl,
    archiveText,
    handleEditPress,
    handleArchive,
    handleUnarchive,
    handleDelete,
    loadData
  };
};
