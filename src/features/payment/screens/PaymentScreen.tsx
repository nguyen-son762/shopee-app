import { URL_IMAGE_CLOUDIARY } from "@env";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import { convertNumberToPrice } from "app/utils/convertPrice";
import React, { useCallback, useMemo, useState } from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PaymentFooter from "../components/PaymentFooter";
import AddressBar from "../components/AddressBar";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItemDef } from "app/features/cart/types/cart.type";
import { ProductDef } from "app/features/product/types/product.type";
import { CartDef } from "app/features/cart/model/cart.model";
import { ORDER_IN_ASYNC_STORAGE } from "app/constants/common.constants";

const PaymentScreen = () => {
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState<Omit<CartDef, "selected">[]>([]);
  const statusBarHeight = insets.top;
  const { height } = useWindowDimensions();
  useFocusEffect(
    useCallback(() => {
      getDataFromAsyncStorage();
    }, [])
  );
  const total = useMemo(() => {
    return orders.reduce((prev, current) => {
      return prev + current.amount * current.model.price;
    }, 0);
  }, [orders]);
  const getDataFromAsyncStorage = async () => {
    const orders = await AsyncStorage.getItem(ORDER_IN_ASYNC_STORAGE);
    if (orders) {
      setOrders(JSON.parse(orders));
    }
  };

  // }]));
  return (
    <SafeAreaView className="flex-col">
      <Header centerContent={<Text className="text-lg">Thanh toán</Text>} />
      <ScrollView
        className="flex-grow bg-[#F5F5F5]"
        style={{
          height: height - 120 - statusBarHeight
        }}
      >
        <AddressBar />

        <View className="bg-white mt-3 py-4">
          {(orders || []).map((order) => {
            return (
              <View className="flex-row py-2 bg-[#fafafa] px-2">
                <Image
                  className="h-[80] w-[80] mr-2"
                  source={{
                    uri: `${URL_IMAGE_CLOUDIARY || ""}${order.model.images}`
                  }}
                />
                <View className="flex-1">
                  <Text numberOfLines={1} className="w-[90%] mb-2 text-base">
                    {order.item.name}
                  </Text>
                  <Text className="text-gray-500">{order.model.name}</Text>
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-primary">{convertNumberToPrice(order.model.price)}</Text>
                    <Text className="text-gray-500">x1</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <PaymentFooter total={total} />
    </SafeAreaView>
  );
};

export default PaymentScreen;
