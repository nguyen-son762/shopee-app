import React, { FC, useMemo, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ProductDef } from "../types/product.type";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { convertNumberToPrice } from "app/utils/convertPrice";
import Divider from "app/components/Divider";
import { URL_IMAGE_CLOUDIARY } from "@env";
import { Theme } from "app/constants/theme.constants";
import { exactString } from "app/utils/exactOption";
import { compareArray } from "app/utils/compareObject";

type AddToCartModalProps = {
  isVisible: boolean;
  close: () => void;
  product: ProductDef;
};

const AddToCartModal: FC<AddToCartModalProps> = ({ isVisible, close, product }) => {
  const [amount, setAmount] = useState("1");
  const onChangeAmount = (text: string) => {
    if (text === "0") {
      setAmount("");
      return;
    }
    if (Number(text) > 999) {
      setAmount("999");
      return;
    }
    setAmount(text.replace(/[^0-9]/g, ""));
  };
  const [options, setOptions] = useState<Record<string, string>>({});
  const selectedProduct = useMemo(() => {
    const exactNameOfProduct = exactString(product.models[0].name);
    if (exactNameOfProduct.length !== Object.keys(options).length) {
      return null;
    }
    return product.models.find((model) =>
      compareArray(exactString(model.name), Object.values(options))
    );
  }, [options]);

  const hanleClickOption = (name: string, option: string) => {
    const newOptions = { ...options };
    if (!newOptions[name]) {
      newOptions[name] = option;
    } else {
      newOptions[name] = newOptions[name] === option ? "" : option;
    }
    setOptions(newOptions);
  };
  const increase = () => {
    const newAmount = Number(amount) + 1;
    setAmount(newAmount > 999 ? "999" : `${newAmount}`);
  };
  const decrease = () => {
    const newAmount = Number(amount) - 1;
    setAmount(newAmount <= 0 ? "1" : `${newAmount}`);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
        behavior="position">
        <View className="flex-col h-[100vh]">
          <View className="bg-black h-[300] opacity-75 flex-1" onTouchEnd={close}></View>
          <View className="bg-white py-4 px-2 pb-[30]">
            <View className="flex-row mb-3">
              <View className="flex-row items-end gap-x-2">
                <View className="relative">
                  <Image
                    className="w-[120] h-[120]"
                    source={{
                      uri: `${URL_IMAGE_CLOUDIARY || ""}${
                        selectedProduct?.images || product.thumb_url
                      }`
                    }}
                  />
                  <View className="absolute top-1 right-1 w-[25] h-[25] bg-[#747474] flex-row items-center justify-center rounded-full">
                    <MaterialIcons name="zoom-out-map" size={18} color="white" />
                  </View>
                </View>

                <Text className="text-primary text-lg">
                  {selectedProduct?.price
                    ? convertNumberToPrice(selectedProduct?.price)
                    : product.price_min === product.price_max
                    ? `${convertNumberToPrice(product.price_min)}`
                    : `${convertNumberToPrice(product.price_min)}-${convertNumberToPrice(
                        product.price_max
                      )}`}
                </Text>
              </View>

              <TouchableOpacity className="flex-1 items-end">
                <AntDesign name="close" size={24} color="#747474" onPress={close} />
              </TouchableOpacity>
            </View>

            <View onTouchEnd={() => Keyboard.dismiss()}>
              {product.tier_variations.map((tier_variation) => (
                <View key={tier_variation.name}>
                  <Divider />
                  <Text className="text-base mt-3 mb-1">{tier_variation.name}</Text>
                  <View className="flex-row flex-wrap gap-x-3 gap-y-4 mb-4">
                    {tier_variation.options.map((option, index) => (
                      <View
                        key={`${option}${index}`}
                        onTouchEnd={() => hanleClickOption(tier_variation.name, option)}
                        style={
                          options[tier_variation.name] && options[tier_variation.name] === option
                            ? {
                                borderColor: Theme.color.primary,
                                borderWidth: 1,
                                backgroundColor: "#fff"
                              }
                            : {
                                borderColor: Theme.color.white,
                                borderWidth: 1,
                                backgroundColor: "#f5f5f5"
                              }
                        }
                        className="flex-row items-center justify-center py-1 px-2 rounded-sm min-w-[50] min-h-[30]">
                        {tier_variation.images && tier_variation.images[index] && (
                          <Image
                            className="w-[26] h-[26]"
                            source={{
                              uri: `${URL_IMAGE_CLOUDIARY}${tier_variation.images[index]}`
                            }}
                          />
                        )}
                        <Text className="ml-1">{option}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <Divider />

            <View className="mt-4 flex-row justify-between">
              <Text className="text-base">Số lượng</Text>
              <View
                className="flex-row"
                style={{
                  borderColor: "#e8e8e8",
                  borderWidth: 1
                }}>
                <TouchableOpacity
                  className="flex-row items-center px-1"
                  style={{
                    borderRightColor: "#e8e8e8",
                    borderRightWidth: 1
                  }}
                  onPress={decrease}>
                  <AntDesign
                    name="minus"
                    size={22}
                    color={Number(amount || 0) <= 1 ? "#a4b0be" : "black"}
                  />
                </TouchableOpacity>
                <View className="flex-row items-center justify-center">
                  <TextInput
                    className="text-primary text-lg text-center w-[50]"
                    style={{
                      paddingBottom: 10,
                      paddingTop: 0
                    }}
                    value={amount}
                    onChangeText={(text) => onChangeAmount(text)}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  className="flex-row items-center px-1"
                  style={{
                    borderLeftColor: "#e8e8e8",
                    borderLeftWidth: 1
                  }}
                  onPress={increase}>
                  <AntDesign
                    name="plus"
                    size={22}
                    color={Number(amount) === 999 ? "#a4b0be" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              className="mt-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 3
              }}>
              <TouchableOpacity
                className={`${selectedProduct ? "bg-primary" : "bg-[#e8e8e8]"} py-3 rounded-sm`}
                disabled={!selectedProduct}>
                <Text
                  className={`text-center text-base ${
                    selectedProduct ? "text-white" : "text-[#a5a5a5]"
                  }`}>
                  Thêm vào Giỏ hàng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddToCartModal;
