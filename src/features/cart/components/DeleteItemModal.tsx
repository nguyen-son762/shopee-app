import Divider from "app/components/Divider";
import React, { FC } from "react";
import { Modal, Text, View } from "react-native";

type DeleteItemModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const DeleteItemModal: FC<DeleteItemModalProps> = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View
        className="flex-col h-full items-center justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.2)"
        }}
        onTouchEnd={onClose}
      >
        <View className="bg-white rounded-md pt-4 w-[85%]">
          <Text className="text-gray-500 mb-4 text-center text-base">
            Bạn chắc chắn muốn bỏ sản phẩm này?
          </Text>
          <Divider />
          <View className="flex-row">
            <View className="flex-1 py-4 text-center" onTouchEnd={onClose}>
              <Text className="text-base text-center">Không</Text>
            </View>
            <View
              className="flex-1 py-4 text-center"
              onTouchEnd={onConfirm}
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#ecf0f1"
              }}
            >
              <Text className="text-primary text-base text-center">Đồng ý</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteItemModal;
