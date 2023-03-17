import { Ionicons } from "@expo/vector-icons";
import { ToastTypeEnum } from "app/features/app/toast/toast.type";
import { useStoreDispatch, useStoreState } from "app/store";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-easy-toast";

const types = {
  [ToastTypeEnum.WARNING]: "ios-warning",
  [ToastTypeEnum.SUCCESS]: "ios-checkmark-circle-outline",
  [ToastTypeEnum.INFO]: "ios-checkmark-circle-outline",
  [ToastTypeEnum.ERROR]: "ios-checkmark-circle-outline"
};

const CustomToast = () => {
  const toastRef = useRef<Toast | null>(null);
  const { description, show, type } = useStoreState((state) => state.toast);
  const {
    toast: { onClose }
  } = useStoreDispatch();

  useEffect(() => {
    if (show) {
      showToast(description);
    }
  }, [show, description]);

  const showToast = (description: string) => {
    toastRef.current?.show(
      <View className="flex-col items-center py-1 px-3">
        <Ionicons name={types[type] as any} size={40} color="white" />
        <Text className="text-white text-base">{description}</Text>
      </View>,
      2000
    );
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Toast
      ref={toastRef}
      position="center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "10px", zIndex: 10000000 }}
    />
  );
};

export default CustomToast;
