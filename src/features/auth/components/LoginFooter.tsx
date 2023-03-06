import { Text, View } from "react-native";
import React from "react";
import CustomLink from "app/components/CustomLink";
import { RoutesNameEnum } from "app/types/routes.types";

const LoginFooter = () => {
  return (
    <View className="absolute bottom-0 left-0 pt-3 bg-[#fafafa] pb-10 flex-row justify-center w-full items-center">
      <Text className="mr-2 text-base">Bạn chưa có tài khoản?</Text>
      <CustomLink
        to={{
          screen: RoutesNameEnum.SIGN_UP as never,
          params: {} as never
        }}
        label="Đăng kí"
      />
    </View>
  );
};

export default LoginFooter;
