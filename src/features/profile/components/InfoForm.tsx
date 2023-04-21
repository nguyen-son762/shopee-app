import CustomButton from "app/components/CustomButton";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import { useStoreState } from "app/store";
import { Formik } from "formik";
import React, { FC, memo, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UpdateInfoTypes } from "../constants/profile.type";

export type InitialFormType = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

type InfoFormProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (
    values: InitialFormType & {
      type: string;
    }
  ) => void;
  type: string;
};

const InfoForm: FC<InfoFormProps> = ({ visible, onClose, onSave, type }) => {
  const { user } = useStoreState((state) => state.auth);
  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || ""
  };
  const onSubmit = (values: InitialFormType) => {
    onSave({
      ...values,
      type: type
    });
  };

  return (
    <Modal className="bg-white h-full" animationType="slide" transparent={true} visible={visible}>
      <SafeAreaView className="h-full bg-white">
        <Header centerContent={<Text>Thay đổi thông tin</Text>} onBack={onClose} />
        <View>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleSubmit, values }) => (
              <View className="px-2">
                {type === UpdateInfoTypes.FULL_NAME ? (
                  <>
                    <Text className="my-3">Họ</Text>
                    <TextInput
                      placeholder="Họ"
                      className="rounded-sm text-base py-2 px-3"
                      style={{
                        borderColor: Theme.color.primary,
                        borderWidth: 1,
                        lineHeight: 20
                      }}
                      value={values.first_name}
                      onChangeText={handleChange("first_name")}
                    />
                    <Text className="my-3">Tên</Text>
                    <TextInput
                      placeholder="Tên"
                      className="rounded-sm text-base py-2 px-3"
                      style={{
                        borderColor: Theme.color.primary,
                        borderWidth: 1,
                        lineHeight: 20
                      }}
                      value={values.last_name}
                      onChangeText={handleChange("last_name")}
                    />
                  </>
                ) : (
                  <>
                    <Text className="my-3">Số điện thoại</Text>
                    <TextInput
                      placeholder="Số điện thoại"
                      className="rounded-sm text-base py-2 px-3"
                      style={{
                        borderColor: Theme.color.primary,
                        borderWidth: 1,
                        lineHeight: 20
                      }}
                      value={values.phone_number}
                      onChangeText={handleChange("phone_number")}
                    />
                  </>
                )}
                <View className="px-1 mt-4">
                  <CustomButton title="Xác nhận" onPress={() => handleSubmit()} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(InfoForm);
