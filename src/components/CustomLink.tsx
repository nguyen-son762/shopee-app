import { Link } from "@react-navigation/native";
import React from "react";
import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";
import { Text } from "react-native";

interface Props {
  label: string;
  to: To<ReactNavigation.RootParamList>;
  textClass?: string;
}

const CustomLink = ({ label, to, textClass = "" }: Props) => {
  return (
    <Link to={to}>
      <Text className={`text-link text-base ${textClass}`}>{label}</Text>
    </Link>
  );
};

export default CustomLink;
