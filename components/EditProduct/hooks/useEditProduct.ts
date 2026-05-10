import { useState, useCallback, useMemo, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import productService, { Product, SourceStatus } from "@/api/services/productService";
import collectionService, { CollectionItem } from "@/api/services/collectionService";
import imageService from "@/api/services/imageService";
import { getFullImageUrl } from "@/api/apiClient";
import { getDisplayData } from "@/utils/display";
import { getUser } from "@/utils/storage";
import { EditProductFormData, EditProductHookData } from "../typedefs";

export const useEditProduct = (
  id?: string, 
  collectionItemId?: string,
  initialProduct?: Product,
  initialCollectionItem?: CollectionItem | null
): EditProductHookData => {
  const router = useRouter();
  const currentUser = getUser();
  
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [collectionItem, setCollectionItem] = useState<CollectionItem | null>(initialCollectionItem || null);
  const [isLoading, setIsLoading] = useState(!initialProduct);

  const displayData = useMemo(() => {
    if (!product) return null;
    return collectionItem ? getDisplayData(collectionItem) : {
      title: product.title,
      brand: product.brand,
      description: product.description,
      imageUrl: product.image?.path || product.image?.url || null
    };
  }, [collectionItem, product]);

  const [formData, setFormData] = useState<EditProductFormData>({
    imageUrl: "",
    brand: "",
    title: "",
    description: "",
    openedDate: "",
    pao: "",
  });

  // Sync form data when displayData or collectionItem changes
  useEffect(() => {
    if (displayData) {
      setFormData({
        imageUrl: getFullImageUrl(displayData.imageUrl) || "",
        brand: displayData.brand || "",
        title: displayData.title,
        description: displayData.description || "",
        openedDate: collectionItem?.openedDate || "",
        pao: collectionItem?.pao?.toString() || "",
      });
    }
  }, [displayData, collectionItem]);

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
      console.error("Failed to load product for editing:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, collectionItemId]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const canEditProduct = useMemo(() => product?.sourceStatus === SourceStatus.ADDED_MANUALLY, [product?.sourceStatus]);
  const userReviewExists = useMemo(() => !!product?.reviews?.some(r => r.userId === currentUser?.id), [product?.reviews, currentUser?.id]);

  const handleSave = useCallback(async () => {
    if (!product) return;
    if (!formData.title || !formData.brand || !formData.openedDate || !formData.pao) {
      Alert.alert("Required Fields", "Please fill in Product Name, Brand, Opened Date, and PAO.");
      return;
    }

    setIsLoading(true);
    try {
      let imageId = undefined;
      const isNewImage = formData.imageUrl && formData.imageUrl.startsWith('file://');
      
      if (isNewImage) {
        const uploaded = await imageService.upload(formData.imageUrl, 'product');
        imageId = uploaded.id;
      }

      if (product.sourceStatus === SourceStatus.ADDED_MANUALLY) {
        await productService.update(product.id, {
          brand: formData.brand,
          title: formData.title,
          description: formData.description,
          imageId: imageId || undefined
        });

        if (collectionItem) {
          await collectionService.update(collectionItem.id, {
            openedDate: formData.openedDate,
            pao: parseInt(formData.pao),
          });
        }
      } else {
        if (collectionItem) {
          await collectionService.update(collectionItem.id, {
            userAddedTitle: formData.title !== product.title ? formData.title : null,
            userAddedDescription: formData.description !== product.description ? formData.description : null,
            userAddedImageId: imageId || null,
            openedDate: formData.openedDate,
            pao: parseInt(formData.pao),
          });
        }
      }

      Alert.alert("Success", "Product updated successfully!");
      router.back();
    } catch (error: any) {
      console.error("Failed to save product:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  }, [formData, product, collectionItem, router]);

  const handleAddReview = useCallback(() => {
    if (!product) return;
    router.push({
      pathname: "/add-review",
      params: { id: product.id }
    });
  }, [router, product]);

  return {
    product,
    collectionItem,
    formData,
    setFormData,
    isLoading,
    canEditProduct,
    userReviewExists,
    handleSave,
    handleAddReview
  };
};
