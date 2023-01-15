import { View } from "react-native";
import React from "react";
import CustomText from "app/components/CustomText";
import CustomLink from "app/components/CustomLink";

const LoginFooter = () => {
  return (
    <View className="absolute bottom-0 left-0 pt-3 bg-[#fafafa] pb-10 flex-row justify-center w-full items-center">
      <CustomText class="mr-2 text-base">Bạn chưa có tài khoản?</CustomText>
      <CustomLink
        to={{
          screen: "Home" as never,
          params: {} as never
        }}
        label="Đăng kí"
      />
    </View>
  );
};

export default LoginFooter;
