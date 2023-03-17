import React, { FC } from "react";
import { View } from "react-native";

type DividerProps = {
  color?: string;
};

const Divider: FC<DividerProps> = ({ color = "#ecf0f1" }) => {
  return (
    <View
      className={`w-full h-[1]`}
      style={{
        backgroundColor: color
      }}
    ></View>
  );
};

export default Divider;
