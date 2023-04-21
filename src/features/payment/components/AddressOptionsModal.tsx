import Header from "app/components/layouts/Header";
import React, { FC, memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native";
import { useAddressOptions } from "../hooks/addressOptions";
import { AddressOptionsParams, AddressOptionsType } from "../types/address.type";
import AddressOptions from "./AddressOptions";
import { customAddressOptions, removeRedundantString } from "app/utils/customAddressOptions";

type AddressOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  update: (params: AddressOptionsParams) => void;
  isShowWard?: boolean;
};

const AddressOptionsModal: FC<AddressOptionsModalProps> = ({
  visible,
  onClose,
  update,
  isShowWard
}) => {
  const {
    city,
    district,
    ward,
    cityList,
    districtList,
    wardList,
    setCity,
    setDistrict,
    setWard,
    reset
  } = useAddressOptions();

  const { height } = useWindowDimensions();
  const cityListModified = useMemo(() => {
    return customAddressOptions<AddressOptionsType>(cityList);
  }, [cityList]);
  const districtListModified = useMemo(() => {
    return customAddressOptions<AddressOptionsType>(districtList);
  }, [districtList]);
  const wardListModified = useMemo(() => {
    return customAddressOptions<AddressOptionsType>(wardList);
  }, [wardList]);

  const [street, setStreet] = useState("");

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaView className="bg-[#F5F5F5]">
        <Header centerContent={<Text></Text>} onBack={onClose} />

        {isShowWard ? (
          <TextInput
            className="pt-3 pb-4 pl-2 bg-white text-base"
            style={{
              lineHeight: 20,
              borderTopColor: "#E8E8E8",
              borderTopWidth: 1
            }}
            placeholder="Tên đường, Tòa nhà, Số nhà"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
        ) : null}

        {city && (
          <View className="bg-white px-2 mb-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-[#5E5E5E] my-2">Khu vực được chọn</Text>
              <TouchableOpacity className="flex-row items-center" onPress={reset}>
                <Text className="text-primary">Thiết lập lại lựa chọn</Text>
              </TouchableOpacity>
            </View>
            {city?.name && <Text className="text-base">{removeRedundantString(city?.name)}</Text>}
            {district?.name && (
              <Text className="text-base">{removeRedundantString(district?.name)}</Text>
            )}
            {ward?.name && <Text className="text-base">{removeRedundantString(ward?.name)}</Text>}
          </View>
        )}

        <View className="flex-col h-[100vh] bg-[#F5F5F5]">
          {!city && cityList.length && (
            <AddressOptions
              title="Tỉnh / Thành phố"
              items={cityListModified}
              onClickItem={(item) => setCity(item)}
              height={height - 150}
            />
          )}
          {city && !district && districtList.length ? (
            <AddressOptions
              title="Quận / Huyện"
              items={districtListModified}
              onClickItem={(item) => setDistrict(item)}
              height={height - 150}
            />
          ) : null}
          {city && district && !ward && wardList.length ? (
            <AddressOptions
              title="Phường / Xã"
              items={wardListModified}
              onClickItem={(item) => {
                setWard(item);
                update({
                  city,
                  district,
                  ward: item,
                  street: isShowWard ? street : undefined
                });
                onClose();
              }}
              height={height - 150}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(AddressOptionsModal);
