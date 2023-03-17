import { URL_IMAGE_CLOUDIARY } from "@env";
import { Theme } from "app/constants/theme.constants";
import { useStoreDispatch } from "app/store";
import Checkbox from "expo-checkbox";
import React, { FC, memo, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CartDef } from "../model/cart.model";
import { AntDesign } from "@expo/vector-icons";
import DeleteItemModal from "./DeleteItemModal";

type CartRowProps = {
  item: CartDef;
};

const CartRow: FC<CartRowProps> = ({ item }) => {
  const {
    cart: {
      update: updateCart,
      increase: increaseAmount,
      decrease: decreaseAmount,
      remove: removeCart
    }
  } = useStoreDispatch();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const onChangeSelected = () => {
    updateCart([
      {
        model_id: item.model._id,
        amount: item.amount,
        selected: !item.selected
      }
    ]);
  };
  const onChangeAmount = (text: string) => {
    updateCart([
      {
        model_id: item.model._id,
        amount: !Number(text) ? 1 : Number(text) > 999 ? 999 : Number(text),
        selected: item.selected
      }
    ]);
  };

  const increase = () => {
    increaseAmount({
      model_id: item.model._id
    });
  };

  const decrease = () => {
    if (item.amount === 1) {
      setIsOpenDeleteModal(true);
      return;
    }
    decreaseAmount({
      model_id: item.model._id
    });
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const onConfirmDeleteModal = () => {
    setIsOpenDeleteModal(false);
    removeCart({
      model_id: item.model._id
    });
  };

  return (
    <View>
      <DeleteItemModal
        visible={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmDeleteModal}
      />
      <View className="flex-row items-center gap-x-3 px-3 ">
        <Checkbox color={Theme.color.primary} value={item.selected} onTouchEnd={onChangeSelected} />
        <View className="flex-row mt-3 w-full">
          <Image
            className="h-[70] w-[70] mr-2"
            source={{
              uri: `${URL_IMAGE_CLOUDIARY || ""}${item.model.images}`
            }}
          />
          <View className="flex-col pt-2 w-full">
            <Text numberOfLines={1} className="w-[65%]">
              {item.item.name}
            </Text>
            <Text>{item.model.name}</Text>
            <View className="mt-2 flex-row justify-between">
              <View
                className="flex-row"
                style={{
                  borderColor: "#e8e8e8",
                  borderWidth: 1
                }}
              >
                <TouchableOpacity
                  className="flex-row items-center px-3"
                  style={{
                    borderRightColor: "#e8e8e8",
                    borderRightWidth: 1
                  }}
                  onPress={decrease}
                >
                  <AntDesign
                    name="minus"
                    size={16}
                    color={Number(item.amount || 0) <= 1 ? "#a4b0be" : "black"}
                  />
                </TouchableOpacity>
                <View className="flex-row items-center justify-center">
                  <TextInput
                    className="text-primary text-lg text-center w-[35]"
                    style={{
                      paddingTop: 0,
                      fontSize: 20,
                      height: 30
                    }}
                    value={`${item.amount}`}
                    onChangeText={(text) => onChangeAmount(text)}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  className="flex-row items-center px-3"
                  style={{
                    borderLeftColor: "#e8e8e8",
                    borderLeftWidth: 1
                  }}
                  onPress={increase}
                  disabled={Number(item.amount) === 999}
                >
                  <AntDesign
                    name="plus"
                    size={16}
                    color={Number(item.amount) === 999 ? "#a4b0be" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CartRow);
