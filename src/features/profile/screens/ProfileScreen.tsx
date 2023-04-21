import { useStoreDispatch, useStoreState } from "app/store";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "../api/profile.api";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "app/components/Divider";
import InfoForm, { InitialFormType } from "../components/InfoForm";
import { UpdateInfoTypes } from "../constants/profile.type";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import CustomToast from "app/components/Toast/CustomToast";
import AddressOptionsModal from "app/features/payment/components/AddressOptionsModal";
import { AddressOptionsParams } from "app/features/payment/types/address.type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { OrderStatusEnums } from "app/features/cart/constants/cart.constants";
import { useFocusEffect } from "@react-navigation/native";
import { getStatus } from "app/features/cart/api/cart.api";

type Props = NativeStackScreenProps<RootStackParams>;

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { set, logout },
    toast: { onOpen }
  } = useStoreDispatch();
  const [formType, setFormType] = useState("fullname");
  const [isVisibleInfoForm, setIsVisibleInfoForm] = useState(false);
  const [isVisibleAddressForm, setIsVisibleAddressForm] = useState(false);
  const [orderAmount, setOrderAmount] = useState({
    ORDERING: 0,
    ORDERED: 0,
    DELIVERING: 0
  });

  const statusOrderList = useMemo(() => {
    return [
      {
        title: "Chờ xác nhận",
        icon: <AntDesign name="codesquareo" size={32} color="#444444" />,
        status: OrderStatusEnums.ORDERING,
        amount: orderAmount.ORDERING
      },
      {
        title: "Chờ lấy hàng",
        icon: <AntDesign name="save" size={32} color="#444444" />,
        status: OrderStatusEnums.ORDERED,
        amount: orderAmount.ORDERED
      },
      {
        title: "Đang giao",
        icon: <MaterialCommunityIcons name="car-pickup" size={32} color="#444444" />,
        status: OrderStatusEnums.DELIVERING,
        amount: orderAmount.DELIVERING
      }
    ];
  }, [orderAmount]);

  useFocusEffect(
    useCallback(() => {
      if (!user?._id) {
        return;
      }
      getStatus(user?._id).then((data) => {
        setOrderAmount(data.status);
      });
    }, [])
  );

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result) {
        return;
      }
      const data = await updateProfile({
        _id: user?._id,
        avatar_url: result.assets![0].base64 || ""
      });
      set(data.data);
      onOpen({
        description: "Cập nhật thành công",
        type: ToastTypeEnum.SUCCESS
      });
    } catch (err) {
      onOpen({
        description: "Cập nhật thất bại",
        type: ToastTypeEnum.ERROR
      });
    }
  };
  const saveInfo = async (
    values: InitialFormType & {
      type: string;
    }
  ) => {
    try {
      let user;
      switch (values.type) {
        case UpdateInfoTypes.PHONENUMBER:
          user = await updateProfile({
            phone_number: values.phone_number
          });
          break;
        case UpdateInfoTypes.FULL_NAME: {
          user = await updateProfile({
            first_name: values.first_name,
            last_name: values.last_name
          });
          break;
        }
        default:
          break;
      }
      if (user?.data) {
        set(user?.data);
        onOpen({
          description: "Cập nhật thành công",
          type: ToastTypeEnum.SUCCESS
        });
      }
    } catch {
      onOpen({
        description: "Cập nhật thất bại",
        type: ToastTypeEnum.ERROR
      });
    } finally {
      setIsVisibleInfoForm(false);
    }
  };
  const updateAddress = async (values: AddressOptionsParams) => {
    try {
      const user = await updateProfile({
        address: [
          {
            city: `${values.city.name}\n${values.district.name}\n${values.ward.name}`,
            street: values.street || ""
          }
        ]
      });
      if (user.data) {
        set(user?.data);
        onOpen({
          description: "Cập nhật thành công",
          type: ToastTypeEnum.SUCCESS
        });
      }
    } catch {
      onOpen({
        description: "Cập nhật thất bại",
        type: ToastTypeEnum.ERROR
      });
    }
  };
  const handleLogout =async ()=>{
    await logout()
    navigation.navigate(RoutesNameEnum.HOME)
  }

  return (
    <View>
      <CustomToast />
      <AddressOptionsModal
        isShowWard
        visible={isVisibleAddressForm}
        onClose={() => setIsVisibleAddressForm(false)}
        update={(values) => updateAddress(values)}
      />
      <InfoForm
        type={formType}
        visible={isVisibleInfoForm}
        onClose={() => setIsVisibleInfoForm(false)}
        onSave={saveInfo}
      />
      <View className="h-[150] bg-[#F45023] pt-[60] flex-row px-2 gap-x-3 items-center">
        <View onTouchEnd={pickImage}>
          <Image
            className="w-[70] h-[70] rounded-full"
            source={{
              uri: user?.avatar_url
            }}
          />
        </View>
        <View>
          <Text className="text-lg text-white font-bold">
            {user?.first_name} {user?.last_name}
          </Text>
        </View>
      </View>

      <View className="bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-between px-3 py-3"
          onPress={() => {
            navigation.navigate(RoutesNameEnum.ORDER, {
              status: OrderStatusEnums.DONE
            });
          }}>
          <View className="flex-row gap-x-3 items-center">
            <FontAwesome name="list-alt" size={24} color="#0058B3" />
            <Text className="text-base">Đơn Mua</Text>
          </View>
          <View>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Divider />

      <View className="bg-white flex-row justify-around pt-5 pb-4">
        {statusOrderList.map((order, index) => {
          return (
            <View
              key={order.status + index}
              className="flex-col items-center justify-center"
              onTouchEnd={() => {
                navigation.navigate(RoutesNameEnum.ORDER, {
                  status: order.status
                });
              }}>
              <View className="relative">
                {order.icon}
                {order.amount ? (
                  <View className="absolute top-[-10] right-[-20] rounded-full flex-row items-center justify-center w-[25] h-[25] bg-primary">
                    <Text className="text-white">{order.amount}</Text>
                  </View>
                ) : null}
              </View>
              <Text className="text-[#444444] mt-4">{order.title}</Text>
            </View>
          );
        })}
      </View>

      <Divider />
      <View className="bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-between px-3 py-3"
          onPress={() => {
            setFormType(UpdateInfoTypes.FULL_NAME);
            setIsVisibleInfoForm(true);
          }}>
          <View className="flex-row gap-x-3 items-center">
            <Text className="text-base">Họ tên</Text>
          </View>
          <View>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      <View className="bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-between px-3 py-3"
          onPress={() => {
            setIsVisibleAddressForm(true);
          }}>
          <View className="gap-x-3">
            <Text>{user?.address?.[0].city ? user?.address[0].city : ""}</Text>
            <Text>{user?.address?.[0].city ? user.address[0].street : ""}</Text>
            <Text className="text-base">Địa chỉ</Text>
          </View>
          <View>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      <View className="bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-between px-3 py-3"
          onPress={() => {
            setFormType(UpdateInfoTypes.PHONENUMBER);
            setIsVisibleInfoForm(true);
          }}>
          <View className="flex-row gap-x-3 items-center">
            <Text className="text-base">Số điện thoại</Text>
          </View>
          <View>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <Divider />
      <View className="bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-between px-3 py-3"
          onPress={handleLogout}>
          <View className="flex-row gap-x-3 items-center">
            <Text className="text-base text-red-500">Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
