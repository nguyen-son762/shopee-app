import { AntDesign } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";
import Comment from "./Comment";
import Divider from "app/components/Divider";

type ReviewsProps = {
  ratingStar: number;
  totalRating: number;
};

const ReviewsProduct: FC<ReviewsProps> = ({ ratingStar, totalRating }) => {
  return (
    <>
      <TouchableOpacity className="flex-row justify-between mt-3 bg-white px-2 items-center pt-3">
        <View>
          <Text className="text-lg font-semibold">Đánh giá sản phẩm</Text>
          <View className="flex-row items-center mb-2">
            <Rating
              type="star"
              readonly
              ratingCount={5}
              startingValue={ratingStar}
              imageSize={16}
            />
            <Text className="ml-2 text-base text-primary">
              <Text className="px-3">{ratingStar.toFixed(1)}/5 &nbsp;</Text>
              <Text className="text-gray-500">
                (
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1
                }).format(totalRating)}{" "}
                đánh giá )
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text className="text-base text-primary">Xem tất cả</Text>
          <AntDesign name="right" size={18} color={Theme.color.primary} />
        </View>
      </TouchableOpacity>

      <Comment />
      <Comment />

      <Divider />

      <TouchableOpacity className="bg-white flex-row justify-center items-center gap-x-2 py-3">
        <Text className="text-primary text-lg">Xem tất cả</Text>
        <AntDesign name="right" size={20} color={Theme.color.primary} />
      </TouchableOpacity>
    </>
  );
};

export default ReviewsProduct;
