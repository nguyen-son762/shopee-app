import React, { FC } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { AddressOptionsType } from "../types/address.type";
import { removeRedundantString } from "app/utils/customAddressOptions";

type AddressOptionsProps = {
  title: string;
  items: {
    title: string;
    data: AddressOptionsType[];
  }[];
  height: number;
  onClickItem: (item: AddressOptionsType) => void;
};

const AddressOptions: FC<AddressOptionsProps> = ({ items, height, onClickItem, title }) => {
  return (
    <View>
      <Text className="text-[#5E5E5E] my-3 mx-2">{title}</Text>
      <View className="bg-white px-3">
        {items.length && (
          <SectionList
            style={{
              height: height
            }}
            sections={items}
            keyExtractor={(item, index) => `${item}${index}`}
            renderItem={(item) => (
              <TouchableOpacity
                className="py-3"
                style={{
                  borderTopColor: "#E7E7E7",
                  borderTopWidth: 1
                }}
                onPress={() => onClickItem(item.item)}
                delayLongPress={5000}
              >
                <Text className="text-base">{removeRedundantString(item.item.name)}</Text>
              </TouchableOpacity>
            )}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={(section) => {
              return <Text className="text-[#5E5E5E] text-base mt-3">{section.section.title}</Text>;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default AddressOptions;
