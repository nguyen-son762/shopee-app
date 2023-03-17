import { AntDesign } from "@expo/vector-icons";
import Header from "app/components/layouts/Header";
import { Theme } from "app/constants/theme.constants";
import React, { FC, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface LoginAndSignUpHeaderProps {
  title: string;
}

const LoginAndSignUpHeader: FC<LoginAndSignUpHeaderProps> = ({ title }) => {
  return (
    <View>
      <Header
        centerContent={<Text>{title}</Text>}
        rightContent={
          <TouchableOpacity>
            <AntDesign name="questioncircleo" size={26} color={Theme.color.primary} />
          </TouchableOpacity>
        }
      />
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
