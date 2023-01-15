import { Text } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  class?: string;
}
function CustomText({ ...props }: Props) {
  return <Text className={`text-lg ${props.class || ""}`}>{props.children}</Text>;
}

export default CustomText;
