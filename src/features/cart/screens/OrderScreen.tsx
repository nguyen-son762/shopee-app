import DefaultLayout from "app/components/layouts/DefaultLayout";
import Header from "app/components/layouts/Header";
import React, { FC, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { OrderStatusEnums, menuTabs } from "../constants/cart.constants";
import { Theme } from "app/constants/theme.constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { CartResponseDef, GetCartResponse } from "../types/cart.type";
import { getCart, updateOrderStatus } from "../api/cart.api";
import { useStoreDispatch, useStoreState } from "app/store";
import { useFocusEffect } from "@react-navigation/native";
import { convertNumberToPrice } from "app/utils/convertPrice";
import CustomButton from "app/components/CustomButton";
import CustomToast from "app/components/Toast/CustomToast";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";

type OrderScreenProps = NativeStackScreenProps<RootStackParams>;

const OrderScreen: FC<OrderScreenProps> = ({ route, navigation }) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    toast: { onOpen }
  } = useStoreDispatch();
  const status = useMemo(() => {
    return (route?.params as { status: OrderStatusEnums })?.status || "";
  }, [route]);
  const [orders, setOrders] = useState<GetCartResponse>([]);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState<CartResponseDef | null>(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, [status, user])
  );
  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, [])
  );

  const getOrder = async () => {
    if (!user?._id) {
      return;
    }
    setLoading(true);
    await getCart(user?._id, status)
      .then((data) => {
        setOrders(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateStatus = async () => {
    if (!orderSelected || !user?._id) {
      return;
    }
    try {
      await updateOrderStatus({
        order_id: orderSelected._id,
        user_id: user?._id,
        status: OrderStatusEnums.CANCEL
      });
      onOpen({
        description: "Hủy hàng thành công",
        type: ToastTypeEnum.SUCCESS
      });
      setIsVisibleCancelModal(false);
      getOrder();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <DefaultLayout>
      <Header centerContent={<Text className="text-base">Đơn mua</Text>} />
      <CustomToast />
      <Modal animationType="slide" transparent={true} visible={isVisibleCancelModal}>
        <View
          className="flex-col h-full items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)"
          }}
        >
          <View className="bg-white w-full py-3">
            <Text className="text-center text-base">Bạn có đồng ý hủy bỏ sản phẩm không ?</Text>
            <View className="flex-row items-center justify-center mt-4 gap-x-3">
              <TouchableOpacity
                className="w-[100]"
                style={{
                  borderColor: Theme.color.primary,
                  borderWidth: 1
                }}
                onPress={() => setIsVisibleCancelModal(false)}
              >
                <Text className="text-base text-center py-2">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[100]"
                style={{
                  borderColor: Theme.color.primary,
                  borderWidth: 1
                }}
                onPress={updateStatus}
              >
                <Text className="text-base bg-primary text-center text-white py-2">Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <FlatList
          className="mt-3"
          initialNumToRender={0}
          data={menuTabs}
          horizontal
          keyExtractor={(item, index) => `${item.title || ""}${index}`}
          renderItem={(item) => (
            <TouchableOpacity
              className="px-2 flex-row items-center h-[40]"
              style={{
                borderBottomColor: Theme.color.primary,
                borderBottomWidth: status === item.item.status ? 3 : 0
              }}
              onPress={() => {
                navigation.navigate(RoutesNameEnum.ORDER, {
                  status: item.item.status
                });
              }}
              delayLongPress={5000}
            >
              <Text className="text-base">{item.item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View className="w-[100%] mt-4">
        {loading ? <ActivityIndicator size="large" color="#ee4d2d" /> : null}
        {orders.length && !loading ? (
          <View className="bg-white mt-3 py-4">
            {(orders || []).map((order) => {
              return (
                <View className="mb-4" key={order._id}>
                  <View className="flex-row py-2 bg-[#fafafa] px-2" key={order.product._id}>
                    <Image
                      className="h-[80] w-[80] mr-2"
                      source={{
                        uri: `https://down-vn.img.susercontent.com/file/${order.product.thumb_url}`
                      }}
                    />
                    <View className="flex-1">
                      <Text numberOfLines={1} className="w-[90%] mb-2 text-base">
                        {order.model}
                      </Text>
                      <Text className="text-gray-500">{order.product.name}</Text>
                      <View className="flex-row justify-between mt-2">
                        <Text className="text-primary">
                          {convertNumberToPrice(order.product.price)}
                        </Text>
                        <Text className="text-gray-500">x{order.amount}</Text>
                      </View>
                    </View>
                  </View>
                  {[OrderStatusEnums.ORDERING, OrderStatusEnums.ORDERED].includes(status) ? (
                    <View className="flex-row justify-end">
                      <CustomButton
                        style={{
                          width: 80
                        }}
                        title="Hủy"
                        onPress={() => {
                          setOrderSelected(order);
                          setIsVisibleCancelModal(true);
                        }}
                      ></CustomButton>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : loading ? null : (
          <Text className="text-primary text-center mt-5 text-lg">Không có sản phẩm nào</Text>
        )}
      </View>
    </DefaultLayout>
  );
};

export default OrderScreen;
