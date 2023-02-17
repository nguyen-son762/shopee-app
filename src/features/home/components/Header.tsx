import React, { memo } from "react";
import { Text, View } from "react-native";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";

interface Props {
  isHaveSpaceToTop: boolean;
  openSearchModal: () => void;
}

const Header = ({ isHaveSpaceToTop, openSearchModal }: Props) => {
  return (
    <View
      className={`${
        isHaveSpaceToTop ? "bg-red-400" : "bg-white"
      } flex-row sticky top-0 left-0 pt-12 pb-4 px-3 items-center gap-3`}
    >
      <View
        className="flex-row items-center flex-1 bg-[#f4f4f4] p-2 rounded-md"
        onTouchEnd={openSearchModal}
      >
        <EvilIcons name="search" size={28} color="#797979" />
        <Text className="text-primary">Tìm kiếm</Text>
      </View>
      <AntDesign name="shoppingcart" size={28} color={Theme.color.primary} />
      <Ionicons name="chatbox-ellipses-outline" size={28} color={Theme.color.primary} />
    </View>
  );
};

export default memo(Header);
