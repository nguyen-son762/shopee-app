import { AntDesign } from "@expo/vector-icons";
import CustomButton from "app/components/CustomButton";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import { Formik } from "formik";
import React, { FC, memo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { AddressValidationSchema } from "../helpers/address.schema";
import { AddressDef } from "app/features/auth/types/auth.type";
import AddressOptionsModal from "./AddressOptionsModal";
import { useAddressOptions } from "../hooks/addressOptions";
import { AddressOptionsType } from "../types/address.type";
import { useStoreDispatch, useStoreState } from "app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS_IN_ASYNC_STORAGE } from "app/constants/common.constants";

type Params = {
  city: AddressOptionsType;
  district: AddressOptionsType;
  ward: AddressOptionsType;
};

type AddAdressModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const initialValues = {
  name: "",
  phone_number: "",
  city: "",
  street: "",
  default: false
};

const AddAdressModal: FC<AddAdressModalProps> = ({ visible, onClose, onUpdate }) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { update }
  } = useStoreDispatch();
  const [isAddressOptionsModal, setIsAddressOptionsModal] = useState(false);
  const { city, setCity, district, setDistrict, ward, setWard, setIsRecallData } =
    useAddressOptions();
  const onSubmit = async (values: AddressDef) => {
    if (user) {
      const addresses = user.address || [];
      await update({
        _id: user._id,
        address: [...addresses, values]
      });
    }
    await AsyncStorage.setItem(ADDRESS_IN_ASYNC_STORAGE, JSON.stringify(values));
    onUpdate();
    onClose();
  };

  const updateAddress = ({ city, district, ward }: Params) => {
    setIsRecallData(false);
    setCity(city);
    setDistrict(district);
    setWard(ward);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaView>
        <View className="flex-col h-[100vh] bg-[#F5F5F5]">
          <Header centerContent={<Text>Địa chỉ mới</Text>} onBack={onClose} />
          <Text className="text-[#5E5E5E] my-3 mx-2">Liên hệ</Text>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={AddressValidationSchema}
            validateOnBlur={true}
          >
            {({ handleChange, handleSubmit, values, isValid, errors, dirty, setFieldValue }) => (
              <>
                <AddressOptionsModal
                  visible={isAddressOptionsModal}
                  onClose={() => setIsAddressOptionsModal(false)}
                  update={(params) => {
                    updateAddress(params);
                    setFieldValue(
                      "city",
                      `${params.city.name} \n ${params.district.name} \n ${params.ward.name}`
                    );
                  }}
                />
                <TextInput
                  value={values.name}
                  className="py-3 pl-2 bg-white text-base"
                  placeholder="Họ và tên"
                  style={{
                    borderBottomColor: "#E8E8E8",
                    borderBottomWidth: 1,
                    lineHeight: 20
                  }}
                  onChangeText={handleChange("name")}
                />
                {errors.name ? (
                  <Text className="text-red-500 bg-[#FFF4F3] py-1">{errors.name}</Text>
                ) : null}

                <TextInput
                  value={values.phone_number}
                  className="py-3 pl-2 bg-white text-base"
                  style={{
                    lineHeight: 20
                  }}
                  placeholder="Số điện thoại"
                  onChangeText={handleChange("phone_number")}
                  keyboardType="number-pad"
                />
                {errors.phone_number ? (
                  <Text className="text-red-500 bg-[#FFF4F3] py-1">{errors.phone_number}</Text>
                ) : null}
                <Text className="text-[#5E5E5E] my-3 mx-2">Địa chỉ</Text>
                <TouchableOpacity
                  className="flex-row items-center justify-between p-2 bg-white"
                  onPress={() => setIsAddressOptionsModal(true)}
                >
                  <View>
                    {city?.name && district?.name && ward?.name ? (
                      <>
                        <Text className="text-base">{city?.name}</Text>
                        <Text className="text-base">{district?.name}</Text>
                        <Text className="text-base">{ward?.name}</Text>
                      </>
                    ) : (
                      <Text className="py-4">Thiết lập địa chỉ</Text>
                    )}
                  </View>
                  <View>
                    <AntDesign name="right" size={20} color="#888888" />
                  </View>
                </TouchableOpacity>
                <TextInput
                  className="pt-3 pb-4 pl-2 bg-white text-base"
                  style={{
                    lineHeight: 20,
                    borderTopColor: "#E8E8E8",
                    borderTopWidth: 1
                  }}
                  placeholder="Tên đường, Tòa nhà, Số nhà"
                  onChangeText={handleChange("street")}
                />
                {errors.street ? (
                  <Text className="text-red-500 bg-[#FFF4F3] py-1">{errors.street}</Text>
                ) : null}

                <Text className="text-[#5E5E5E] my-3 mx-2">Cài đặt</Text>
                <View className="flex-row justify-between items-center px-2 bg-white py-4">
                  <Text>Đặt làm mặc định</Text>
                  <Switch
                    trackColor={{ false: "#E9E9EB", true: Theme.color.primary }}
                    ios_backgroundColor="#E9E9EB"
                    value={values.default}
                    onChange={(e) => setFieldValue("default", e.nativeEvent.value)}
                  />
                </View>
                <View className="px-2 mt-5">
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className={`rounded-sm ${!(isValid && dirty) ? "bg-[#DFDFDF]" : "bg-primary"}`}
                  >
                    <Text
                      className={`text-center text-lg py-2 ${
                        !(isValid && dirty) ? "text-[#A3A3A3]" : "text-white"
                      }`}
                    >
                      HOÀN THÀNH
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(AddAdressModal);
