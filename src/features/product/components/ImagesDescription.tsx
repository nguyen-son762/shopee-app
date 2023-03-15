import { URL_IMAGE_CLOUDIARY } from "@env";
import { Theme } from "app/constants/theme.constants";
import React, { FC, memo } from "react";
import { FlatList, Image, View } from "react-native";

type ImagesDescriptionProps = {
  images: string[];
  selectedImage: string;
  onTapImage: (url: string)=>void
};

const ImagesDescription: FC<ImagesDescriptionProps> = ({ images, selectedImage,onTapImage }) => {
  return (
    <View>
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={(image) => (
          <View
            className="mr-2 rounded-sm"
            style={{
              borderColor: selectedImage === image.item ? Theme.color.primary : "#fff",
              borderWidth: 1
            }}
            onTouchEnd={()=>onTapImage(image.item)}
            >
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
