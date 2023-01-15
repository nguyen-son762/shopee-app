import { Link } from "@react-navigation/native";
import React from "react";
import CustomText from "./CustomText";
import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";

interface Props {
  label: string;
  to: To<ReactNavigation.RootParamList>;
  textClass?: string;
}

const CustomLink = ({ label, to, textClass = "" }: Props) => {
  return (
    <Link to={to}>
      <CustomText class={`text-link text-base ${textClass}`}>{label}</CustomText>
    </Link>
  );
};

export default CustomLink;
