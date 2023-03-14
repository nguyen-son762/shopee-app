import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ActionHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const statusBarHeight = insets.top;
  return (
    <View
      className="flex-row justify-between w-full absolute z-10 bg-transparent px-4 pt-2"
      style={{
        top: statusBarHeight - 40,
        left: 0
      }}
    >
      <TouchableOpacity
        className="flex-row items-center justify-center w-[35] h-[35] rounded-full bg-[#757670]"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <View className="flex-row items-center gap-x-3">
        <TouchableOpacity>
          <FontAwesome name="share" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center w-[35] h-[35] rounded-full bg-[#757670]">
          <AntDesign name="shoppingcart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center w-[35] h-[35] rounded-full bg-[#757670]">
          <SimpleLineIcons name="options-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionHeader;
