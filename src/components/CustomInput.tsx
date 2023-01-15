import React, { memo, useState } from "react";
import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import CustomLink from "./CustomLink";

interface Props {
  icon: React.ElementType;
  iconName: unknown;
  iconColor: string;
  size?: number;
  showIcon?: boolean;
  borderWidth?: number;
  borderColor?: string;
  placeholder?: string;
  inputClass?: string;
  isPassword?: boolean;
  value?: string;
  onChangeText?: ((text: string) => void) | undefined;
}

const CustomInput = ({
  icon,
  iconName,
  iconColor,
  size,
  borderColor,
  borderWidth,
  placeholder,
  showIcon = false,
  inputClass,
  isPassword,
  value,
  onChangeText
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
        secureTextEntry={isPassword && !showPassword}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="text-base flex-1 h-[50]"
        value={value}
      />
      {isPassword && (
        <View className="translate-y-[3px] flex-row items-center">
          <Feather
            color={iconColor}
            size={size || 24}
            name={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword(!showPassword)}
          />
          <View className="w-[1px] h-[25px] bg-[#cdcecc] mx-3"></View>
          <CustomLink
            to={{
              screen: "Home" as never,
              params: {} as never
            }}
            label="Quên?"
          />
        </View>
      )}
    </View>
  );
};

export default memo(CustomInput);
