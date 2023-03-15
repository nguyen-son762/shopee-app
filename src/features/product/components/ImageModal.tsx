import { URL_IMAGE_CLOUDIARY } from "@env";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Theme } from "app/constants/theme.constants";
import React, { FC, useRef, useState } from "react";
import { Image, Modal, Text, View, useWindowDimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

type ImageModalProps = {
  images: string[];
  isVisible: boolean;
  close: () => void;
};

const ImageModal: FC<ImageModalProps> = ({ isVisible, images, close }) => {
  const { width } = useWindowDimensions();
  const [numOfImage, setNumOfImage] = useState(0);
  const carouselImagesRef = useRef<SwiperFlatListRefProps | null>(null);
  useFocusEffect(
    React.useCallback(() => {
      setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
    }, [])
  );
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="bg-black relative min-h-full">
        <View className=" mt-10 px-5 flex-row w-full justify-between items-center">
          <AntDesign
            name="arrowleft"
            size={30}
            color={Theme.color.primary}
            onPress={close}
          />
          <Text className="text-white">
            {numOfImage + 1} / {images.length}
          </Text>
        </View>

        <View className="flex-row flex-1 items-center justify-center">
          <SwiperFlatList
            ref={carouselImagesRef}
            index={0}
            data={images}
            onMomentumScrollEnd={() => {
              setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
            }}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{
                    uri: `${URL_IMAGE_CLOUDIARY || ""}${item}`
                  }}
                  style={{
                    width: width,
                    height: 400
                  }}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
