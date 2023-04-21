import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS_IN_ASYNC_STORAGE } from "app/constants/common.constants";
import { Theme } from "app/constants/theme.constants";
import { AddressDef } from "app/features/auth/types/auth.type";
import { useStoreState } from "app/store";
import React, { FC, memo, useEffect, useImperativeHandle, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AddressBarProps = {
  openAddAddressModal: () => void;
};

type GetAddress = {
  getAddress: () => any;
};

const AddressBar = React.forwardRef<GetAddress, any>(
  ({ openAddAddressModal }: AddressBarProps, ref) => {
    const { user } = useStoreState((state) => state.auth);
    const [address, setAddress] = useState<AddressDef | null>(user?.address?.[0] || null);
    useImperativeHandle(ref, () => ({
      async getAddress() {
        const addressesInStorage = await AsyncStorage.getItem(ADDRESS_IN_ASYNC_STORAGE);
        if (addressesInStorage) {
          setAddress(JSON.parse(addressesInStorage));
        }
      }
    }));
    const getAddress = async () => {
      const addressesInStorage = await AsyncStorage.getItem(ADDRESS_IN_ASYNC_STORAGE);
      if (addressesInStorage) {
        setAddress(JSON.parse(addressesInStorage));
      }
    };
    useEffect(() => {
      setAddressToLocal();
    }, []);
    const setAddressToLocal = async () => {
      if (user && user.address?.length) {
        await AsyncStorage.setItem(ADDRESS_IN_ASYNC_STORAGE, JSON.stringify(user?.address![0]));
      }
      getAddress();
    };
    return (
      <>
        <TouchableOpacity className="flex-row gap-x-3 bg-white mt-3 py-3 px-2">
          <View>
            <Ionicons name="location-outline" size={24} color={Theme.color.primary} />
          </View>
          <View className="flex-1">
            <Text className="mb-2">Địa chỉ nhận hàng</Text>
            {address && address.city ? (
              <View>
                <Text className="text-base">{address.name}</Text>
                <Text className="text-base">{address.phone_number}</Text>
                <Text className="text-base">
                  {address.street}, {address.city.split("\n").reverse().join(",")}
                </Text>
              </View>
            ) : (
              <Text>Chưa có địa chỉ nào được thiết lập</Text>
            )}
          </View>
          <AntDesign name="right" size={20} color="#95a5a6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openAddAddressModal}>
          <View className="flex-row justify-center items-center gap-1 mt-3">
            <AntDesign name="pluscircleo" size={20} color={Theme.color.primary} />
            <Text className="text-primary">Thêm địa chỉ mới</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
);

export default memo(AddressBar);
