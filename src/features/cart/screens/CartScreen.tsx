import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams } from "app/types/routes.types";
import React, { FC, useCallback, useMemo } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { CartDef } from "../model/cart.model";
import CartRowContainer from "../components/CartRowContainer";
import CartFooter from "../components/CartFooter";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CART_IN_ASYNC_STORAGE } from "app/constants/common.constants";
import { useIsFocused } from "@react-navigation/native";

type CartScreenProps = NativeStackScreenProps<RootStackParams>;

const CartScreen: FC<CartScreenProps> = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const { height } = useWindowDimensions();
  const { cart } = useStoreState((state) => state.cart);
  const isFocused = useIsFocused();
  const {
    cart: { set: setCart, get: getCart }
  } = useStoreDispatch();
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(CART_IN_ASYNC_STORAGE).then((data) => {
        if (data) {
          setCart(
            JSON.parse(data).map((item: Omit<CartDef, "selected">) => {
              return {
                ...item,
                selected: false
              };
            })
          );
        }
      });
      getCart();
    }, [getCart, setCart,isFocused])
  );

  const cartModified = useMemo(() => {
    return cart.reduce((prev: Record<string, CartDef[]>, current: CartDef) => {
      if (!prev[current.item.category.name]) {
        prev[current.item.category.name] = [current];
      } else {
        prev[current.item.category.name].push(current);
      }
      return prev;
    }, {});
  }, [cart]);

  return (
    <SafeAreaView
      className="flex-col"
      style={{
        height,
        backgroundColor: "white"
      }}
    >
      <Header centerContent={<Text>Giỏ hàng</Text>} />
      {!cart.length ? (
        <View className=" h-full flex-row items-center justify-center">
          <View
            className="flex-col justify-center items-center"
            style={{
              transform: [{ translateY: -40 }]
            }}
          >
            <MaterialCommunityIcons name="cart-variant" size={60} color={Theme.color.primary} />
            <Text className="text-primary text-2xl">Giỏ hàng trống</Text>
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-grow bg-[#F5F5F5]"
            style={{
              height: height - 100 - statusBarHeight
            }}
          >
            <Text className="text-primary text-xl mt-3 text-center mb-3">
              Tất cả ( {cart.length} )
            </Text>
            <View className="bg-white">
              {Object.keys(cartModified).map((key) => (
                <CartRowContainer key={key} category={key} cartItem={cartModified[key]} />
              ))}
            </View>
          </ScrollView>
          <CartFooter />
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
