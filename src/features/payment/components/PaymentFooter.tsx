import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { convertNumberToPrice } from "app/utils/convertPrice";
import Checkbox from "expo-checkbox";
import React, { FC, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { purchaseCart } from "../api/payment.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ORDER_IN_ASYNC_STORAGE } from "app/constants/common.constants";

type PaymentFooterProps = {
  total: number;
};

const PaymentFooter: FC<PaymentFooterProps> = ({ total }) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSubmit =async () =>{
    try{
      await purchaseCart([{
        user_id: '',
        product_id: '',
        model_id: '',
        promotion_code: null,
        cart_id: '',
        amount:1
      }])
      await AsyncStorage.removeItem(ORDER_IN_ASYNC_STORAGE)
    }
    catch {

    }
  }

  return (
    <View
      className="flex-row justify-between items-center px-0 pb-3"
      style={{
        shadowRadius: 9,
        shadowOffset: {
          width: 1,
          height: -10
        },
        shadowColor: "#000000",
        backgroundColor: "white",
        shadowOpacity: 0.1
      }}
    >
      <View></View>
      <View className="flex-row h-full items-center gap-x-2 ">
        <View className="flex-col items-end">
          <Text>Tổng thanh toán</Text>
          <Text className="text-primary text-base font-bold text-end">
            {convertNumberToPrice(total)}
          </Text>
        </View>
        <TouchableOpacity className="bg-primary h-full flex-row items-center" onPress={handleSubmit}>
          <Text className="text-white text-base py-4 px-7 font-semibold">Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentFooter;
