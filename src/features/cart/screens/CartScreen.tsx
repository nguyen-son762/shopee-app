import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Header
        centerContent={<Text>Giỏ hàng</Text>}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
