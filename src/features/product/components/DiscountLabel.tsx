import React, { FC } from "react";
import { Text, View } from "react-native";

type DiscountLabelProps = {
  rawDiscount: number;
};

const DiscountLabel: FC<DiscountLabelProps> = ({ rawDiscount }) => {
  return (
    <View>
      <View className="bg-[#fcd530] py-1 px-2">
        <Text className="text-primary text-center">{rawDiscount}%</Text>
        <Text className="text-white text-center">GIẢM</Text>
      </View>
      <View className="flex-row">
        <View
          style={{
            width: 0,
            height: 0,
            borderTopColor: "#fcd530",
            borderTopWidth: 10,
            borderRightColor: "transparent",
            borderRightWidth: 28,
            borderBottomColor: "transparent",
            borderBottomWidth: 28
          }}
        ></View>
        <View
          style={{
            width: 0,
            height: 0,
            borderTopColor: "#fcd530",
            borderTopWidth: 10,
            borderLeftColor: "transparent",
            borderLeftWidth: 28,
            borderBottomColor: "transparent",
            borderBottomWidth: 28
          }}
        ></View>
      </View>
    </View>
  );
};

export default DiscountLabel;
