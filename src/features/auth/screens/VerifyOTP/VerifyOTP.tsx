import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomButton from "app/components/CustomButton";
import DefaultLayout from "app/components/layouts/DefaultLayout";
import { Theme } from "app/constants/theme.constants";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { FC, useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParams>;

const VerifyOTP: FC<Props> = ({ navigation }) => {
  const {
    auth: { verifyOtp },
    toast: { onOpen }
  } = useStoreDispatch();
  const { user } = useStoreState((state) => state.auth);
  const [otpText, setOtpText] = useState("");
  const otpRef = useRef<TextInput>(null);
  useEffect(() => {
    otpRef.current?.focus();
  }, []);
  const handleChangeOtp = (text: string) => {
    setOtpText(text.slice(0, 4));
  };
  const handleVerify = async () => {
    const result = await verifyOtp({
      otp: otpText,
      access_token: user?.access_token || ""
    });
    if (result.data?.active) {
      navigation.navigate(RoutesNameEnum.HOME);
    } else {
      onOpen({
        description: "Mã OTP không hợp lệ",
        type: ToastTypeEnum.WARNING
      });
    }
  };

  return (
    <DefaultLayout isShowBackButton>
      <View className="w-0 h-0">
        <TextInput
          placeholder="hello world"
          contextMenuHidden
          value={otpText}
          ref={otpRef}
          onChangeText={handleChangeOtp}
          keyboardType="number-pad"
        />
      </View>
      <View className="pt-[30%] px-8">
        <Text className="text-center text-lg">Mã xác thực đã được gửi đến số điện thoại:</Text>
        <Text className="text-center text-xl font-bold">{user?.access_token}</Text>
        <View className="flex-row justify-between mt-[60]">
          {Array.from({
            length: 4
          }).map((_, index) => {
            return (
              <View
                key={index}
                className="h-[60] w-[40] flex-row justify-center pb-3"
                style={{
                  borderBottomColor: Theme.color.primary,
                  borderBottomWidth: 2
                }}
              >
                <Text
                  className="text-primary"
                  style={{
                    lineHeight: 50,
                    fontSize: 40
                  }}
                >
                  {otpText[index] || ""}
                </Text>
              </View>
            );
          })}
        </View>
        <View className="flex-row items-center justify-center mt-7 w-full">
          <CustomButton
            classNames="rounded-sm"
            isFullWidth
            fontSize={20}
            title="Xác nhận"
            onPress={() => handleVerify()}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

export default VerifyOTP;
