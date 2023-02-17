import React, { FC, memo, useEffect, useRef } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import CustomButton from "app/components/CustomButton";

interface Props {
  open: boolean;
  close: () => void;
}

const SearchModal: FC<Props> = ({ open, close }) => {
  const history = ["Áo nam", "Bút bi", "Gấu bông"];
  const searchRef = useRef<TextInput>(null);
  useEffect(() => {
    console.warn("useEffect");
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);
  console.warn("searchRef", searchRef);

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View className="bg-white pt-10 h-full mt-2">
        <View className="flex-row h-10 items-center px-2">
          <Ionicons name="arrow-back" size={28} color={Theme.color.primary} onPress={close} />
          <TextInput
            className="h-full flex-1 px-3 ml-1"
            placeholder="Tìm kiếm"
            style={{
              borderWidth: 1,
              borderColor: Theme.color.primary,
              borderBottomLeftRadius: 6,
              borderTopLeftRadius: 6
            }}
            ref={searchRef}
          />
          <CustomButton
            classNames="h-full w-12 flex-row justify-center items-center"
            onPress={() => {}}
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
