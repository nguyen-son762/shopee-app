import { Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";

interface Props {
  title: string;
  classNames?: string;
  fontSize?: number;
  onPress: (() => void) | undefined;
}

const CustomButton = ({ title, classNames, fontSize = 16, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={`bg-primary py-2 ${classNames || ""}`}>
        <Text className="text-center text-white" style={{ fontSize: fontSize }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomButton);
