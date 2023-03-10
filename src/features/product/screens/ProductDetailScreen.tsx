import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "app/types/routes.types";
import React, { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import { ProductDef } from "../types/product.type";
import { URL_IMAGE_CLOUDIARY } from "@env";
import SwiperFlatList from "react-native-swiper-flatlist";
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";
import ActionHeader from "../components/ActionHeader";
import ImagesDescription from "../components/ImagesDescription";
import DiscountLabel from "../components/DiscountLabel";
import { Rating } from "react-native-ratings";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import RenderHTML from "react-native-render-html";
import Divider from "app/components/Divider";
import { Theme } from "app/constants/theme.constants";
import ReviewsProduct from "../components/ReviewsProduct";
import { products } from "app/mock/product";
import Product from "../components/Product";

type ProductDetailProps = NativeStackScreenProps<RootStackParams>;
const screenWidth = Dimensions.get("window").width;

const ProductDetailScreen: FC<ProductDetailProps> = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const route = useRoute();
  const product = useMemo(() => (route?.params as { item: ProductDef })?.item, [route?.params]);
  const carouselImagesRef = useRef<SwiperFlatListRefProps | null>(null);
  const [numOfImage, setNumOfImage] = useState(0);
  const [isShowAllDescription, setIsShowAllDescription] = useState(false);
  const totalRating = useMemo(
    () => product.item_rating.rating_count.reduce((current, prev) => prev + current, 0),
    [product]
  );
  useEffect(() => {
    setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
  }, []);

  return (
    <SafeAreaView
      className="flex-col relative"
      style={{
        height: height - 20
      }}
    >
      <ScrollView className="flex-1">
        <ActionHeader />
        <View className="relative">
          <SwiperFlatList
            ref={carouselImagesRef}
            index={0}
            onMomentumScrollEnd={() => {
              setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
            }}
            data={product.images}
            renderItem={({ item }: { item: string }) => (
              <View>
                <Image
                  source={{
                    uri: `${URL_IMAGE_CLOUDIARY}${item}`
                  }}
                  style={{
                    width: screenWidth,
                    height: 250
                  }}
                />
              </View>
            )}
          />
          <View
            className="absolute bg-white z-10 rounded-xl px-3"
            style={{
              bottom: 10,
              right: 10
            }}
          >
            <Text className="text-[#747474] text-base">
              {numOfImage + 1} / {product.images.length}
            </Text>
          </View>
        </View>

        <View className="px-2 bg-white">
          <Text className="py-2">{product.models.length} ph??n lo???i</Text>
          <ImagesDescription images={product.images} />

          <View className="flex-row justify-between mt-8">
            <Text
              className="text-lg"
              style={{
                width: "80%"
              }}
            >
              {product.name}
            </Text>
            <DiscountLabel rawDiscount={product.raw_discount} />
          </View>

          <Text className="text-primary text-2xl mt-3">
            {product.price_max !== product.price_min
              ? `???${product.price_min.toLocaleString()} - ???${product.price_max.toLocaleString()}`
              : `???${product.price_min.toLocaleString()}`}
          </Text>
          <Text className="text-gray-400 line-through text-lg">
            {product.price_max_before_discount !== product.price_min_before_discount
              ? `???${product.price_min_before_discount.toLocaleString()} - ???${product.price_max_before_discount.toLocaleString()}`
              : `???${product.price_min_before_discount.toLocaleString()}`}
          </Text>

          <View className="flex-row items-center mt-4 mb-2">
            <Rating
              type="star"
              readonly
              ratingCount={5}
              startingValue={product.item_rating.rating_star}
              imageSize={28}
            />
            <Text className="ml-3 text-base">{product.item_rating.rating_star.toFixed(1)}</Text>
          </View>
        </View>

        <View className="bg-white mt-3 px-3">
          <Text className="text-lg font-semibold mt-2">M?? t??? s???n ph???m</Text>
          <View
            className="h-[200] overflow-hidden"
            style={{
              height: isShowAllDescription ? "auto" : 200
            }}
          >
            <RenderHTML
              contentWidth={width}
              source={{
                html: `<p style="font-size:16px">${product.description.replaceAll(
                  "\n",
                  "<br />"
                )}</p>`
              }}
            />
          </View>

          <Divider />

          <TouchableOpacity
            className="mt-3 flex-row justify-center items-center gap-x-2 pb-3"
            onPress={() => setIsShowAllDescription(!isShowAllDescription)}
          >
            <Text className="text-primary text-lg">
              {isShowAllDescription ? "Thu g???n" : "Xem th??m"}
            </Text>
            <AntDesign
              name={isShowAllDescription ? "up" : "down"}
              size={20}
              color={Theme.color.primary}
            />
          </TouchableOpacity>
        </View>

        <ReviewsProduct ratingStar={product.item_rating.rating_star} totalRating={totalRating} />

        <View>
          <View className="my-2">
            <Text className="text-base text-center">C?? th??? b???n c??ng th??ch</Text>
          </View>
          <View className="px-2">
            <FlatList
              initialNumToRender={0}
              numColumns={2}
              data={products}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 10
              }}
              keyExtractor={(item, index) => `${item._id || ""}${index}`}
              ListFooterComponent={<ActivityIndicator size="large" color="#ee4d2d" />}
              renderItem={(product) => (
                <View
                  style={{
                    width: (screenWidth - 16) / 2 - 4
                  }}
                >
                  <Product
                    navigation={navigation}
                    product={product.item}
                    width={(screenWidth - 16) / 2 - 4}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <View className="flex-row">
        <TouchableOpacity className="flex-1 bg-[#26a997] flex-col justify-center items-center py-1">
          <FontAwesome name="cart-plus" size={28} color="#fff" />
          <Text className="text-white text-base">Th??m v??o gi??? h??ng</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-[#ee4d2d] flex-row items-center justify-center py-1">
          <Text className="text-white text-lg">Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(ProductDetailScreen);
