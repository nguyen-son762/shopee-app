import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import React, { FC, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface LoginAndSignUpHeaderProps {
  title: string;
}

const LoginAndSignUpHeader: FC<LoginAndSignUpHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        className="flex-row items-center shadow-md bg-white p-3"
        style={{
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          shadowRadius: 3
        }}
      >
        <View className="w-[30%]">
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={30}
              color={Theme.color.primary}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </View>
        <Text className="flex-1 text-black text-center">{title}</Text>
        <View className="w-[30%] flex-row justify-end pr-1">
          <TouchableOpacity>
            <AntDesign name="questioncircleo" size={26} color={Theme.color.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="text-center flex-row justify-center pt-10">
        <Image
          className="w-28 h-28 object-cover"
          source={require("e-commerce-app/src/assets/images/shopee_logo.png")}
        />
      </View>
    </View>
  );
};

export default memo(LoginAndSignUpHeader);
