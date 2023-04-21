import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import CustomButton from "app/components/CustomButton";
import { Formik } from "formik";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  open: boolean;
  close: () => void;
  onSearch: (text: string) => void;
}

type initialForm = {
  keyword: string;
};

const SearchModal: FC<Props> = ({ open, close, onSearch }) => {
  const history = ["Áo nam", "Bút bi", "Gấu bông"];
  const searchRef = useRef<TextInput>(null);
  useFocusEffect(
    useCallback(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, [])
  );
  const handleSubmitForm = (values: initialForm) => {
    onSearch(values.keyword);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View className="bg-white pt-10 h-full mt-2">
        <View className="flex-row h-10 items-center px-2">
          <Ionicons name="arrow-back" size={28} color={Theme.color.primary} onPress={close} />
          <Formik
            initialValues={{
              keyword: ""
            }}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, handleSubmit, values }) => (
              <>
                <TextInput
                  className="h-full flex-1 px-3 ml-1"
                  placeholder="Tìm kiếm"
                  style={{
                    borderWidth: 1,
                    borderColor: Theme.color.primary,
                    borderBottomLeftRadius: 6,
                    borderTopLeftRadius: 6
                  }}
                  value={values.keyword}
                  ref={searchRef}
                  onChangeText={handleChange("keyword")}
                  onSubmitEditing={() => handleSubmit()}
                />
                <CustomButton
                  classNames="h-full w-12 flex-row justify-center items-center"
                  onPress={() => handleSubmit()}
                  icon={AntDesign}
                  iconName="search1"
                  size={22}
                  iconColor={Theme.color.white}
                  style={{
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    overflow: "hidden"
                  }}
                />
              </>
            )}
          </Formik>
        </View>

        <View className="mt-3">
          {history.map((item) => {
            return (
              <View key={item}>
                <Text className="text-lg py-2 pl-3">{item}</Text>
                <View className="w-full bg-[#F2F2F2]" style={{ height: 1 }}></View>
              </View>
            );
          })}
        </View>

        <View>
          <Text className="text-lg text-center py-2 text-[#898989]">Xóa Lịch Sử Tìm Kiếm</Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(SearchModal);
