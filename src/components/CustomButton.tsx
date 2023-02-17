import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { memo } from "react";

interface Props extends TouchableOpacityProps {
  title?: string;
  classNames?: string;
  fontSize?: number;
  onPress: (() => void) | undefined;
  icon?: React.ElementType;
  iconName?: unknown;
  iconColor?: string;
  size?: number;
}

const CustomButton = ({
  title,
  classNames,
  fontSize = 16,
  icon,
  iconName,
  iconColor,
  size,
  ...props
}: Props) => {
  const Icon = icon;
  return (
    <TouchableOpacity {...props}>
      <View className={`bg-primary py-2 ${classNames || ""}`}>
        {Icon && <Icon color={iconColor} size={size || 24} name={iconName} />}
        <Text className="text-center text-white" style={{ fontSize: fontSize }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomButton);
