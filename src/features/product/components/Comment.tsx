import Divider from "app/components/Divider";
import React from "react";
import { Image, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

const Comment = () => {
  return (
    <View className="bg-white">
      <Divider />
      <View className="flex-row px-2 py-2 gap-x-3">
        <View>
          <Image
            className="h-[30] w-[30] rounded-full object-contain"
            source={{
              uri: "http://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg"
            }}
          />
        </View>

        <View>
          <Text className="mb-2">son1234</Text>
          <Rating type="star" readonly ratingCount={5} startingValue={3} imageSize={18} />
          <Text className="mt-2 text-base">Sản phẩm abcd</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;
