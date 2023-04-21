import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import { FC, ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";

type HeaderProps = {
  rightContent?: ReactNode;
  centerContent: ReactNode;
  leftContent?: ReactNode;
  onBack?: () => void;
};

const Header: FC<HeaderProps> = ({ rightContent, centerContent, leftContent, onBack }) => {
  const navigation = useNavigation();
  return (
    <View
      className="flex-row items-center shadow-md bg-white"
      style={{
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        height: 50
      }}
    >
      <View className="w-[30%]">
        {leftContent || (
          <TouchableOpacity className="pl-3">
            <Ionicons
              name="arrow-back"
              size={30}
              color={Theme.color.primary}
              onPress={() => {
                if (onBack) {
                  onBack();
                  return;
                }
                navigation.goBack();
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 text-black flex-row items-center justify-center">
        {centerContent}
      </View>
      <View className="w-[30%] flex-row justify-end pr-1">{rightContent}</View>
    </View>
  );
};

export default Header;
