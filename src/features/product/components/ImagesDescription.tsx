import { URL_IMAGE_CLOUDIARY } from "@env";
import React, { FC, memo } from "react";
import { FlatList, Image, View } from "react-native";

type ImagesDescriptionProps = {
  images: string[];
};

const ImagesDescription: FC<ImagesDescriptionProps> = ({ images }) => {
  return (
    <View>
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={(image) => (
          <View className="mr-2">
            <Image
              className="w-[100] h-[100]"
              source={{
                uri: `${URL_IMAGE_CLOUDIARY}${image.item}`
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default memo(ImagesDescription);
