import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID, FACEBOOK_CLIENT_ID } from "@env";

import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import CustomInput from "app/components/CustomInput";
import CustomButton from "app/components/CustomButton";
import PlatformButton from "../../components/PlatformButton";
import LoginFooter from "../../components/LoginFooter";
import { useStoreState, useStoreDispatch } from "app/store";
import LoginAndSignUpHeader from "../../components/LoginAndSignUpHeader";
import DefaultLayout from "app/components/layouts/DefaultLayout";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";

type Props = NativeStackScreenProps<RootStackParams>;

interface LoginFormValues {
  email: string;
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
        onOpen({
          description: "???? c?? l???i x???y ra",
          type: ToastTypeEnum.WARNING
        });
        return;
      }
      navigation.navigate(RoutesNameEnum.HOME);
    }
    handleLoginByFacebook();
  }, [responseFacebook, onGetUserByFacebook, user, navigation, onOpen]);

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
        onOpen({
          description: "???? c?? l???i x???y ra",
          type: ToastTypeEnum.WARNING
        });
      }
    }
    handleLoginByGoogle();
  }, [response, onGetUserByGoogle, user, navigation, onOpen]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
      if (!user) {
        onOpen({
          description: "Email/T??n ????ng nh???p kh??ng h???p l???",
          type: ToastTypeEnum.WARNING
        });
      }
    } catch {
      onOpen({
        description: "Email/T??n ????ng nh???p kh??ng h???p l???",
        type: ToastTypeEnum.WARNING
      });
    }
  };

  return (
    <DefaultLayout>
      <LoginAndSignUpHeader title="????ng nh???p" />

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
                placeholder="Email/T??n ng?????i d??ng"
                onChangeText={handleChange("email")}
              />
              <CustomInput
                value={values.password}
                isPassword
                icon={Feather}
                inputClass="mt-4"
                placeholder="M???t kh???u"
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
              title="????ng nh???p"
              classNames="mx-6 mt-4"
              fontSize={18}
            />
          </View>
        )}
      </Formik>

      <View className="flex-row items-center justify-center mt-7">
        <View className="h-[1px] w-8 bg-[#f5f5f5]"></View>
        <Text className="mx-2">Ho???c</Text>
        <View className="h-[1px] w-8 bg-[#f5f5f5]"></View>
      </View>

      <View className="mt-4 mx-6">
        <PlatformButton
          label="Ti???p t???c v???i Google"
          iconName="google"
          icon={AntDesign}
          iconColor="#ea4236"
          onPress={() => promptAsync()}
        />
      </View>
      <View className="mt-4 mx-6">
        <PlatformButton
          label="Ti???p t???c v???i Facebook"
          iconName="facebook"
          icon={FontAwesome5}
          iconColor="#1777f1"
          onPress={() => promptAsyncFacebook()}
        />
      </View>

      <LoginFooter />
    </DefaultLayout>
  );
};

export default LoginScreen;
