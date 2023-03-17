import { convertNumberToPrice } from "app/utils/convertPrice";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PaymentFooterProps = {
  total: number;
  onSubmit: () => void;
};

const PaymentFooter: FC<PaymentFooterProps> = ({ total, onSubmit }) => {
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
        <TouchableOpacity className="bg-primary h-full flex-row items-center" onPress={onSubmit}>
          <Text className="text-white text-base py-4 px-7 font-semibold">Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentFooter;
