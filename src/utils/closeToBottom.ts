import { NativeScrollPoint, NativeScrollSize } from "react-native";

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}: {
  layoutMeasurement: NativeScrollSize;
  contentOffset: NativeScrollPoint;
  contentSize: NativeScrollSize;
}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
