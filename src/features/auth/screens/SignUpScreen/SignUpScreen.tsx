import DefaultLayout from "app/components/layouts/DefaultLayout";
import React, { FC } from "react";
import { Text, View } from "react-native";
import LoginAndSignUpHeader from "../../components/LoginAndSignUpHeader";
import { Formik } from "formik";
import CustomInput from "app/components/CustomInput";
import { Feather, FontAwesome } from "@expo/vector-icons";
import CustomButton from "app/components/CustomButton";
import { SignUpValidationSchema, initialValuesSignUpForm } from "../../helper/form.helper";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SignUpScreenProps = NativeStackScreenProps<RootStackParams>;

type InitialSignUpForm = {
  phone_number: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
};

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { loading } = useStoreState((state) => state.auth);
  const {
    auth: { signUp }
  } = useStoreDispatch();
  const handleSignUp = async (values: InitialSignUpForm) => {
    try {
      if (loading) {
        return;
      }
      const result = await signUp(values);
      if (result && result?.data) {
        navigation.navigate(RoutesNameEnum.VERIFY_OTP);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <DefaultLayout>
      <LoginAndSignUpHeader title="Đăng kí" />

      <Formik
        initialValues={initialValuesSignUpForm}
        validationSchema={SignUpValidationSchema}
        onSubmit={handleSignUp}>
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <View className="px-6 mt-2">
              <CustomInput
                value={values.first_name}
                icon={Feather}
                inputClass="mt-3"
                placeholder="Họ"
                iconName="lock"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon={false}
                onChangeText={handleChange("first_name")}
              />
              <CustomInput
                value={values.last_name}
                icon={Feather}
                inputClass="mt-3"
                placeholder="Tên"
                iconName="lock"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon={false}
                onChangeText={handleChange("last_name")}
              />
              <CustomInput
                value={values.phone_number}
                icon={FontAwesome}
                iconName="mobile-phone"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                placeholder="Số điện thoại"
                onChangeText={handleChange("phone_number")}
              />
              {errors.phone_number && touched.phone_number && (
                <Text className="text-red-500 mt-1">{errors.phone_number}</Text>
              )}
              <CustomInput
                value={values.password}
                isPassword
                icon={Feather}
                inputClass="mt-3"
                placeholder="Mật khẩu"
                iconName="lock"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500 mt-1">{errors.password}</Text>
              )}
              <CustomInput
                value={values.confirmPassword}
                isPassword
                icon={Feather}
                inputClass="mt-3"
                placeholder="Mật khẩu"
                iconName="lock"
                size={22}
                iconColor="#595959"
                borderWidth={1}
                borderColor="#cececd"
                showIcon
                onChangeText={handleChange("confirmPassword")}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text>
              )}
            </View>
            <CustomButton
              onPress={() => handleSubmit()}
              title="Đăng kí"
              classNames="mx-6 mt-4"
              fontSize={18}
            />
          </View>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default SignUpScreen;
