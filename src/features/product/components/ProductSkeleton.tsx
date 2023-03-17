import React, { memo } from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const ProductSkeleton = () => {
  const { width } = useWindowDimensions();
  const imageWidth = (width - 16) / 2 - 4;
  return (
    <View className="bg-white mt-3 relative">
      <View
        className="absolute top-[70] w-[60] h-[60] z-10"
        style={{
          left: imageWidth / 2 - 30
        }}
      >
        <Image className="w-full h-full" source={require("app/assets/images/skeleton_logo.jpeg")} />
      </View>
      <ShimmerPlaceHolder
        shimmerStyle={{
          width: imageWidth,
          height: 200
        }}
        LinearGradient={LinearGradient}
      />
      <View className="pt-3">
        <ShimmerPlaceHolder
          shimmerStyle={{
            width: imageWidth,
            height: 20
          }}
          LinearGradient={LinearGradient}
        />
      </View>
      <View className="pt-3">
        <ShimmerPlaceHolder
          shimmerStyle={{
            width: imageWidth,
            height: 20
          }}
          LinearGradient={LinearGradient}
        />
      </View>
    </View>
  );
};

export default memo(ProductSkeleton);
