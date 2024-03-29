import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID, FACEBOOK_CLIENT_ID } from "@env";

import React, { useCallback } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import CustomInput from "app/components/CustomInput";
import CustomButton from "app/components/CustomButton";
import LoginFooter from "../../components/LoginFooter";
import { useStoreState, useStoreDispatch } from "app/store";
import LoginAndSignUpHeader from "../../components/LoginAndSignUpHeader";
import DefaultLayout from "app/components/layouts/DefaultLayout";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import { useFocusEffect } from "@react-navigation/native";
import { AUTH_IN_ASYNC_STORAGE } from "app/constants/common.constants";

type Props = NativeStackScreenProps<RootStackParams>;

interface LoginFormValues {
  phone_number: string;
  password: string;
}

const LoginScreen = ({ navigation }: Props) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { login, onGetUserByGoogle, onGetUserByFacebook },
    toast: { onOpen }
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
    phone_number: "",
    password: ""
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.navigate(RoutesNameEnum.HOME);
      }
    }, [user, navigation])
  );

  async function handleLoginByFacebook() {
    if (responseFacebook?.type !== "success" || !responseFacebook.authentication) {
      return;
    }
    await onGetUserByFacebook(responseFacebook.authentication.accessToken);
    if (!user) {
      return;
    }
    navigation.navigate(RoutesNameEnum.HOME);
  }

  async function handleLoginByGoogle() {
    if (response?.type !== "success") {
      return;
    }
    const persistAuth = async () => {
      await AsyncStorage.setItem(AUTH_IN_ASYNC_STORAGE, JSON.stringify(response.authentication));
    };
    await persistAuth();
    await onGetUserByGoogle(response.authentication?.accessToken || "");
  }

  useFocusEffect(
    useCallback(() => {
      handleLoginByGoogle();
    }, [handleLoginByGoogle])
  );
  useFocusEffect(
    useCallback(() => {
      handleLoginByFacebook();
    }, [handleLoginByFacebook])
  );

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
      if (!user) {
        onOpen({
          description: "Email/Tên đăng nhập không hợp lệ",
          type: ToastTypeEnum.WARNING
        });
      }
    } catch {
      onOpen({
        description: "Email/Tên đăng nhập không hợp lệ",
        type: ToastTypeEnum.WARNING
      });
    }
  };

  return (
    <DefaultLayout>
      <LoginAndSignUpHeader title="Đăng nhập" />

      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <View className="px-6 mt-2">
              <CustomInput
                value={values.phone_number}
                icon={AntDesign}
                iconName="user"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                placeholder="Số điện thoại"
                onChangeText={handleChange("phone_number")}
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
                isForgotPassword
                onChangeText={handleChange("password")}
              />
            </View>
            <CustomButton
              onPress={() => handleSubmit()}
              title="Đăng nhập"
              classNames="mx-6 mt-4"
              fontSize={18}
            />
          </View>
        )}
      </Formik>

      <LoginFooter />
    </DefaultLayout>
  );
};

export default LoginScreen;
