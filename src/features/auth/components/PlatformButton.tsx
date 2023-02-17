import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthSessionResult } from "expo-auth-session";

interface Props {
  label: string;
  icon: React.ElementType;
  iconColor: string;
  iconSize?: number;
  iconName: string;
  onPress?: () => void | Promise<AuthSessionResult>;
}

const PlatformButton = (props: Props) => {
  const { icon: Icon, label, iconColor, iconSize = 24, iconName, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className="flex-row items-center py-2 pl-2"
        style={{
          borderWidth: 1,
          borderColor: "#bfbfbf"
        }}
      >
        <View className="w-[20%]">
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </View>
        <Text className="text-lg flex-1 text-center">{label}</Text>
        <View className="w-[20%]"></View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PlatformButton);
