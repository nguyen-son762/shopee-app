import React, { memo, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import CustomLink from "./CustomLink";

interface Props extends TextInputProps {
  icon: React.ElementType;
  iconName: unknown;
  iconColor: string;
  size?: number;
  showIcon?: boolean;
  borderWidth?: number;
  borderColor?: string;
  inputClass?: string;
  isPassword?: boolean;
  isForgotPassword?: boolean;
}

const CustomInput = ({
  icon,
  iconName,
  iconColor,
  size,
  borderColor,
  borderWidth,
  showIcon = false,
  inputClass,
  isPassword,
  isForgotPassword,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = icon;
  return (
    <View
      className={`flex-row items-center ${inputClass || ""}`}
      style={{
        borderBottomColor: borderColor,
        borderBottomWidth: borderWidth
      }}
    >
      {showIcon && (
        <View className="pr-3 translate-y-[3px]">
          <Icon color={iconColor} size={size || 24} name={iconName} />
        </View>
      )}
      <TextInput
        {...props}
        secureTextEntry={isPassword && !showPassword}
        className="text-base flex-1 h-[50]"
      />
      {isPassword && (
        <View className="translate-y-[3px] flex-row items-center">
          <Feather
            color={iconColor}
            size={size || 24}
            name={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword(!showPassword)}
          />
          {isForgotPassword && (
            <>
              <View className="w-[1px] h-[25px] bg-[#cdcecc] mx-3"></View>
              <CustomLink
                to={{
                  screen: "Home" as never,
                  params: {} as never
                }}
                label="Quên?"
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default memo(CustomInput);
