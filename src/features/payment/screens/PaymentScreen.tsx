import { URL_IMAGE_CLOUDIARY } from "@env";
import Header from "app/components/layouts/Header";
import { convertNumberToPrice } from "app/utils/convertPrice";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PaymentFooter from "../components/PaymentFooter";
import AddressBar from "../components/AddressBar";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartDef } from "app/features/cart/model/cart.model";
import { ADDRESS_IN_ASYNC_STORAGE, CART_IN_ASYNC_STORAGE, ORDER_IN_ASYNC_STORAGE } from "app/constants/common.constants";
import { purchaseCart } from "../api/payment.api";
import { useStoreDispatch, useStoreState } from "app/store";
import CustomToast from "app/components/Toast/CustomToast";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import { OrderStatusEnums } from "app/features/cart/constants/cart.constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import AddAdressModal from "../components/AddAdressModal";

type PaymentScreenProps = NativeStackScreenProps<RootStackParams>;

interface GetAddress {
  getAddress: () => any;
}

const PaymentScreen: FC<PaymentScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useStoreState((state) => state.auth);
  const {
    toast: { onOpen }
  } = useStoreDispatch();
  const [orders, setOrders] = useState<Omit<CartDef, "selected">[]>([]);
  const [isVisibleAddAddressModal, setIsVisibleAddAddressModal] = useState(false);
  const addressBarRef = useRef<GetAddress>(null);
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
      setOrders(JSON.parse(orders) as Omit<CartDef, "selected">[]);
    }
  };

  const handleSubmit = async () => {
    try {
      const addressInStorage = await AsyncStorage.getItem(ADDRESS_IN_ASYNC_STORAGE);
      const parseAddress = JSON.parse(addressInStorage || "");
      const data = orders.map((order) => {
        return {
          user: user?._id,
          product: order.item._id,
          model: order.model._id,
          promotion_code: undefined,
          cart_id: order._id,
          amount: order.amount,
          note: "",
          status: OrderStatusEnums.ORDERED,
          phonenumber: parseAddress.phone_number,
          address: `${parseAddress.street}, ${parseAddress.city.split("\n").reverse().join(",")}`
        };
      });
      await purchaseCart(data);
      const cartInStorage = await AsyncStorage.getItem(CART_IN_ASYNC_STORAGE);
      const cart = JSON.parse(cartInStorage||'')
      const filterCart = cart.filter((item: CartDef)=> !orders.find(order=>order._id === item._id) )
      await AsyncStorage.setItem(CART_IN_ASYNC_STORAGE,JSON.stringify(filterCart))
      onOpen({
        description: "Đặt hàng thành công",
        type: ToastTypeEnum.SUCCESS
      });
      await AsyncStorage.removeItem(ORDER_IN_ASYNC_STORAGE);
      setTimeout(() => {
        navigation.navigate(RoutesNameEnum.HOME);
      }, 1000);
    } catch (err) {
      onOpen({
        description: "Đặt hàng thất bại",
        type: ToastTypeEnum.SUCCESS
      });
    }
  };

  // }]));
  return (
    <SafeAreaView className="flex-col">
      <Header centerContent={<Text className="text-lg">Thanh toán</Text>} />
      <CustomToast />
      <ScrollView
        className="flex-grow bg-[#F5F5F5]"
        style={{
          height: height - 120 - statusBarHeight
        }}
      >
        <AddressBar
          ref={addressBarRef}
          openAddAddressModal={() => setIsVisibleAddAddressModal(true)}
        />
        <AddAdressModal
          visible={isVisibleAddAddressModal}
          onClose={() => setIsVisibleAddAddressModal(false)}
          onUpdate={() => addressBarRef.current?.getAddress()}
        />

        <View className="bg-white mt-3 py-4">
          {(orders || []).map((order) => {
            return (
              <View className="flex-row py-2 bg-[#fafafa] px-2" key={order.model._id}>
                <Image
                  className="h-[80] w-[80] mr-2"
                  source={{
                    uri: `${URL_IMAGE_CLOUDIARY || ""}/${order.model.images}`
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
      <PaymentFooter total={total} onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

export default PaymentScreen;
