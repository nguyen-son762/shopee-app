import React from "react";
import { Text, View } from "react-native";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";

interface Props {
  openSearchModal: () => void;
}

const HomeHeader = ({ openSearchModal }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <View className={`bg-white flex-row sticky top-0 left-0 py-2 px-3 items-center gap-x-3`}>
      <View
        className={`bg-[#f4f4f4 flex-row items-center flex-1 p-2 rounded-md`}
        onTouchEnd={openSearchModal}
      >
        <EvilIcons name="search" size={28} color="#797979" />
        <Text className="text-primary">Tìm kiếm</Text>
      </View>
      <AntDesign
        name="shoppingcart"
        size={28}
        color={Theme.color.primary}
        onPress={() => navigation.navigate(RoutesNameEnum.CART)}
      />
      <Ionicons name="chatbox-ellipses-outline" size={28} color={Theme.color.primary} />
    </View>
  );
};

export default HomeHeader;
