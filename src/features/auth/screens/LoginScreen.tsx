import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID, FACEBOOK_CLIENT_ID } from "@env";

import React, { useEffect, useRef } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import Toast from "react-native-easy-toast";

import { Theme } from "app/constants/theme.constants";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import CustomInput from "app/components/CustomInput";
import CustomButton from "app/components/CustomButton";
import PlatformButton from "../components/PlatformButton";
import LoginFooter from "../components/LoginFooter";
import { useStoreState, useStoreDispatch } from "app/store";

type Props = NativeStackScreenProps<RootStackParams>;

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen = ({ navigation }: Props) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { login, onGetUserByGoogle, onGetUserByFacebook }
  } = useStoreDispatch();
  const toastRef = useRef<Toast | null>(null);
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID
  });

  const [, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
    clientId: FACEBOOK_CLIENT_ID
  });
  const initialValues = {
    email: "",
    password: ""
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(RoutesNameEnum.HOME);
    }
  }, [user, navigation]);

  useEffect(() => {
    async function handleLoginByFacebook() {
      if (responseFacebook?.type !== "success" || !responseFacebook.authentication) {
        return;
      }
      await onGetUserByFacebook(responseFacebook.authentication.accessToken);
      if (!user) {
        showToast("Đã có lỗi xảy ra");
      }
    }
    handleLoginByFacebook();
  }, [responseFacebook, onGetUserByFacebook, user]);

  useEffect(() => {
    async function handleLoginByGoogle() {
      if (response?.type !== "success") {
        return;
      }
      const persistAuth = async () => {
        await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
      };
      await persistAuth();
      await onGetUserByGoogle(response.authentication?.accessToken || "");
      if (!user) {
        showToast("Đã có lỗi xảy ra");
      }
    }
    handleLoginByGoogle();
  }, [response, onGetUserByGoogle, user]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
      if (!user) {
        showToast();
      }
    } catch {
      showToast();
    }
  };
  const showToast = (description = "Email/Tên đăng nhập không hợp lệ") => {
    toastRef.current?.show(
      <View className="flex-col items-center py-1 px-3">
        <Ionicons name="ios-warning" size={40} color="white" />
        <Text className="text-white text-base">{description}</Text>
      </View>,
      2000
    );
  };

  return (
    <SafeAreaView className="bg-white min-h-full">
      <Toast
        ref={(toast) => (toastRef.current = toast)}
        position="center"
        style={{ backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "10px" }}
      />

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
        <Text className="flex-1 text-black text-center">Đăng nhập</Text>
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

      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <View className="px-6 mt-2">
              <CustomInput
                value={values.email}
                icon={AntDesign}
                iconName="user"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                placeholder="Email/Tên người dùng"
                onChangeText={handleChange("email")}
              />
              <CustomInput
                value={values.password}
                isPassword
                icon={Feather}
                inputClass="mt-4"
                placeholder="Mật khẩu"
                iconName="lock"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                onChangeText={handleChange("password")}
              />
            </View>
            <CustomButton
              onPress={handleSubmit}
              title="Đăng nhập"
              classNames="mx-6 mt-4"
              fontSize={18}
            />
          </View>
        )}
      </Formik>

      <View className="flex-row items-center justify-center mt-7">
        <View className="h-[1px] w-8 bg-[#f5f5f5]"></View>
        <Text className="mx-2">Hoặc</Text>
        <View className="h-[1px] w-8 bg-[#f5f5f5]"></View>
      </View>

      <View className="mt-4 mx-6">
        <PlatformButton
          label="Tiếp tục với Google"
          iconName="google"
          icon={AntDesign}
          iconColor="#ea4236"
          onPress={() => promptAsync()}
        />
      </View>
      <View className="mt-4 mx-6">
        <PlatformButton
          label="Tiếp tục với Facebook"
          iconName="facebook"
          icon={FontAwesome5}
          iconColor="#1777f1"
          onPress={() => promptAsyncFacebook()}
        />
      </View>

      <LoginFooter />
    </SafeAreaView>
  );
};

export default LoginScreen;
