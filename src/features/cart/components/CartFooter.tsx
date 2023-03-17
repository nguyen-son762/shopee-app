import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { convertNumberToPrice } from "app/utils/convertPrice";
import Checkbox from "expo-checkbox";
import React, { memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CartFooter = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { cart } = useStoreState((state) => state.cart);
  const {
    cart: { update: updateCart }
  } = useStoreDispatch();
  const total = useMemo(() => {
    return cart.reduce((prev, current) => {
      return prev + current.model.price * current.amount;
    }, 0);
  }, [cart]);
  const isSelectedAll = useMemo(() => {
    return cart.every((item) => item.selected);
  }, [cart]);

  const onChangeSelectedAll = () => {
    const newCart = cart
      .map((item) => {
        return {
          ...item,
          selected: !isSelectedAll
        };
      })
      .map((item) => {
        return {
          model_id: item.model._id,
          amount: item.amount,
          selected: item.selected
        };
      });
    updateCart(newCart);
  };

  return (
    <View
      className="flex-row justify-between items-center px-0 flex-grow pb-3"
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
      <View className="flex-row items-center py-2 px-3">
        <Checkbox
          color={Theme.color.primary}
          value={isSelectedAll}
          onTouchEnd={onChangeSelectedAll}
        />
        <Text className="ml-2">Tất cả</Text>
      </View>
      <View className="flex-row h-full items-center">
        <Text>
          Tổng thanh toán{" "}
          <Text className="text-primary text-base font-bold">{convertNumberToPrice(total)}</Text>
        </Text>
        <TouchableOpacity
          className="bg-primary h-full flex-row items-center"
          onPress={() => navigation.navigate(RoutesNameEnum.HOME)}
        >
          <Text className="text-white text-base p-4 font-semibold">Mua hàng ({cart.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(CartFooter);
