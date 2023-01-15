import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
  GOOGLE_URL_AUTHENTICATION,
  FACEBOOK_CLIENT_ID
} from "@env";

import React, { useEffect, useRef } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import axios from "axios";
import Toast from "react-native-easy-toast";

import { Theme } from "app/constants/theme.constants";
import { RootStackParams } from "app/types/routes.types";
import CustomText from "app/components/CustomText";
import CustomInput from "app/components/CustomInput";
import CustomButton from "app/components/CustomButton";
import PlatformButton from "../components/PlatformButton";
import LoginFooter from "../components/LoginFooter";
import { AuthEndpointsEnum } from "../constants/auth.endpoints";
import { getUserByFacebook } from "../api/auth.api";
import { useStoreState, useStoreDispatch } from "app/store";

type Props = NativeStackScreenProps<RootStackParams>;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: Props) {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { login }
  } = useStoreDispatch();
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
    function handleLoginByFacebook() {
      if (responseFacebook?.type !== "success" || !responseFacebook.authentication) {
        return;
      }
      getUserByFacebook(responseFacebook.authentication.accessToken)
        .then(() => {})
        .catch(() => {});
    }
    handleLoginByFacebook();
  }, [responseFacebook]);

  useEffect(() => {
    async function handleLoginByGoogle() {
      if (response?.type !== "success") {
        return;
      }
      const persistAuth = async () => {
        await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
      };
      await persistAuth();
      axios
        .create({
          baseURL: GOOGLE_URL_AUTHENTICATION,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.authentication?.accessToken || ""}`
          },
          withCredentials: true
        })
        .get(AuthEndpointsEnum.GOOGLE_AUTHENTICATION)
        .then((data) => {
          console.warn("data", data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    handleLoginByGoogle();
  }, [response]);

  const handleLogin = async (values: LoginFormValues) => {
    await login(values);
    if (!user) {
      showToast();
    }
  };
  const showToast = () => {
    toastRef.current?.show(
      <View className="flex-col items-center py-1 px-3">
        <Ionicons name="ios-warning" size={40} color="white" />
        <CustomText class="text-white text-base">Email/Tên đăng nhập không hợp lệ</CustomText>
      </View>,
      2000
    );
  };
  const toastRef = useRef<Toast | null>(null);
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
        <CustomText class="flex-1 text-black text-center">Đăng nhập</CustomText>
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
        <CustomText class="mx-2">Hoặc</CustomText>
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
}
