import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { memo } from "react";

interface Props extends TouchableOpacityProps {
  title?: string;
  classNames?: string;
  fontSize?: number;
  icon?: React.ElementType;
  iconName?: unknown;
  iconColor?: string;
  size?: number;
  isFullWidth?: boolean;
}

const CustomButton = ({
  title,
  classNames,
  fontSize = 16,
  icon,
  iconName,
  iconColor,
  size,
  isFullWidth,
  ...props
}: Props) => {
  const Icon = icon;
  return (
    <TouchableOpacity {...props} className={isFullWidth ? "w-full" : ""}>
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
