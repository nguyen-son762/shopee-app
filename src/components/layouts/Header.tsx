import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import { FC, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  rightContent?: ReactNode;
  centerContent: ReactNode;
  leftContent?: ReactNode;
};

const Header: FC<HeaderProps> = ({ rightContent, centerContent, leftContent }) => {
  const navigation = useNavigation();
  return (
    <View
      className="flex-row items-center shadow-md bg-white p-3"
      style={{
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3
      }}>
      <View className="w-[30%]">
        {leftContent || (
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={30}
              color={Theme.color.primary}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 text-black flex-row items-center justify-center">{centerContent}</View>
      <View className="w-[30%] flex-row justify-end pr-1">
        {rightContent}
      </View>
    </View>
  );
};

export default Header;
