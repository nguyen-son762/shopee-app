import ProductSkeleton from "app/features/product/components/ProductSkeleton";
import React from "react";
import { View } from "react-native";

const ProductLoader = () => {
  return (
    <View className="flex-row flex-wrap justify-between">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </View>
  );
};

export default ProductLoader;
