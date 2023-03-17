import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AddressBar = () => {
  return (
    <TouchableOpacity className="flex-row gap-x-3 bg-white mt-3 py-3 px-2">
      <View>
        <Ionicons name="location-outline" size={24} color={Theme.color.primary} />
      </View>
      <View className="flex-1">
        <Text className="mb-2">Địa chỉ nhận hàng</Text>
        <Text>Nguyễn Thái Sơn1826378617836781</Text>
        <Text>Nguyễn Thái Sơn1826378617836781</Text>
      </View>
      <AntDesign name="right" size={20} color="#95a5a6" />
    </TouchableOpacity>
  );
};

export default AddressBar;
