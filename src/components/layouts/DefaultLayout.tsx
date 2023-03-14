import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomToast from "../Toast/CustomToast";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DefaultLayoutProps {
  children: React.ReactNode;
  isShowBackButton?: boolean;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children, isShowBackButton = false }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white min-h-full">
      {isShowBackButton && (
        <View className="ml-3 w-[30%]">
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={30}
              color={Theme.color.primary}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </View>
      )}
      <CustomToast />
      {children}
    </SafeAreaView>
  );
};

export default DefaultLayout;
