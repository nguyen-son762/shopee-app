import { useFocusEffect, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "app/types/routes.types";
import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  ActivityIndicator,
  TouchableWithoutFeedback,
  LogBox
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
import Product from "../components/Product";
import AddToCartModal from "../components/AddToCartModal";
import ImageModal from "../components/ImageModal";
import CustomToast from "app/components/Toast/CustomToast";
import { getProductById, getProducts } from "../api/product.api";
import { useStoreDispatch, useStoreState } from "app/store";
import { likedProduct } from "app/features/auth/api/auth.api";

type ProductDetailProps = NativeStackScreenProps<RootStackParams>;
const screenWidth = Dimensions.get("window").width;

const ProductDetailScreen: FC<ProductDetailProps> = ({ navigation }) => {
  const { user } = useStoreState((state) => state.auth);
  const {
    auth: { set }
  } = useStoreDispatch();
  const { width, height } = useWindowDimensions();
  const route = useRoute();
  const product = useMemo(() => (route?.params as { item: ProductDef })?.item, [route?.params]);
  const carouselImagesRef = useRef<SwiperFlatListRefProps | null>(null);
  const [products, setProducts] = useState<ProductDef[]>([]);
  const [numOfImage, setNumOfImage] = useState(0);
  const [isShowAllDescription, setIsShowAllDescription] = useState(false);
  const [isVisibleModalAddToCart, setIsVisibleModalAddToCart] = useState(false);
  const [isVisibleModalImages, setIsVisibleModalImages] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [liked, setLiked] = useState(false);
  const totalRating = useMemo(
    () => product.item_rating.rating_count.reduce((current, prev) => prev + current, 0),
    [product]
  );

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const likedProduct = user.liked?.find((item) => item.product === product._id);
        if (likedProduct) {
          setLiked(true);
        }
      }
      // const id =(route.params as any)?.item?._id
      // getProductById(id).then(data=>{
      //   console.warn('data',data)
      // }).catch(err=>{
      //   console.warn(err)
      // })
      getRecommendProducts().then((data) => {
        setProducts(data.data);
      });
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      if (user) {
        const likedProduct = user.liked?.find((item) => item.product === product._id);
        if (likedProduct) {
          setLiked(true);
        }
      }
    }, [user, product])
  );
  const getRecommendProducts = async () => {
    return await getProducts({
      category: product.category._id
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
  }, [selectedImage]);

  const onClickImage = (url: string) => {
    setSelectedImage(url);
    carouselImagesRef.current?.scrollToIndex({
      index: product.images.findIndex((image) => image === url) || 0
    });
  };

  const handleLiked = async () => {
    try {
      if (!user) {
        return;
      }
      const data = await likedProduct({
        user_id: user?._id,
        product: product._id
      });
      set({
        data: data.data,
        access_token: user.access_token
      });
      setLiked(!liked);
    } catch (err) {
      console.log("err", err);
    }
  };
  const description = useMemo(() => product.description || "", [product]);
  return (
    <SafeAreaView
      className="flex-col relative"
      style={{
        height: height - 20
      }}>
      <CustomToast />
      <ScrollView className="flex-1">
        <ActionHeader />
        <ImageModal
          isVisible={isVisibleModalImages}
          images={product.images}
          close={() => setIsVisibleModalImages(false)}
        />
        <View className="relative">
          <SwiperFlatList
            ref={carouselImagesRef}
            index={0}
            onMomentumScrollEnd={() => {
              setNumOfImage(carouselImagesRef.current?.getCurrentIndex() || 0);
              setSelectedImage(product.images[carouselImagesRef.current?.getCurrentIndex() || 0]);
            }}
            keyboardShouldPersistTaps="always"
            data={product.images}
            renderItem={({ item }: { item: string }) => (
              <TouchableWithoutFeedback
                onPress={() => setIsVisibleModalImages(true)}
                delayLongPress={3000}>
                <Image
                  source={{
                    uri: `${URL_IMAGE_CLOUDIARY}/${item}`
                  }}
                  style={{
                    width: screenWidth,
                    height: 250
                  }}
                />
              </TouchableWithoutFeedback>
            )}
          />
          <View
            className="absolute bg-white z-10 rounded-xl px-3"
            style={{
              bottom: 10,
              right: 10
            }}>
            <Text className="text-[#747474] text-base">
              {numOfImage + 1} / {product.images.length}
            </Text>
          </View>
        </View>

        <View className="px-2 bg-white">
          <Text className="py-2">{product.models.length} phân loại</Text>
          <ImagesDescription
            images={product.images}
            selectedImage={selectedImage}
            onTapImage={(url) => onClickImage(url)}
          />
          <View className="flex-row justify-end mt-4 mr-5">
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={Theme.color.primary}
              onPress={handleLiked}
            />
          </View>
          <View className="flex-row justify-between mt-3">
            <Text
              className="text-lg"
              style={{
                width: "80%"
              }}>
              {product.name}
            </Text>
            <DiscountLabel rawDiscount={product.raw_discount} />
          </View>

          <Text className="text-primary text-xl mt-3">
            {product.price_max !== product.price_min
              ? `₫${product.price_min.toLocaleString()} - ₫${product.price_max.toLocaleString()}`
              : `₫${product.price_min.toLocaleString()}`}
          </Text>
          <Text className="text-gray-400 line-through text-lg">
            {product.price_max_before_discount !== product.price_min_before_discount
              ? `₫${product.price_min_before_discount.toLocaleString()} - ₫${product.price_max_before_discount.toLocaleString()}`
              : `₫${product.price_min_before_discount.toLocaleString()}`}
          </Text>

          <View className="flex-row items-center mt-4 mb-2">
            <Rating
              type="star"
              readonly
              ratingCount={5}
              startingValue={product.item_rating.rating_star}
              imageSize={24}
            />
            <Text className="ml-3 text-base">{product.item_rating.rating_star.toFixed(1)}</Text>
          </View>
        </View>

        <View className="bg-white mt-3 px-3">
          <Text className="text-lg font-semibold mt-2">Mô tả sản phẩm</Text>
          <View
            className="h-[200] overflow-hidden"
            style={{
              height: isShowAllDescription ? "auto" : 200
            }}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `<p style="font-size:14px">${description.split(
                  /\n/,
                ).join("<br />")}</p>`
              }}
            />
          </View>

          <Divider />

          <TouchableOpacity
            className="mt-3 flex-row justify-center items-center gap-x-2 pb-3"
            onPress={() => setIsShowAllDescription(!isShowAllDescription)}>
            <Text className="text-primary text-lg">
              {isShowAllDescription ? "Thu gọn" : "Xem thêm"}
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
            <Text className="text-base text-center">Có thể bạn cũng thích</Text>
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
              keyExtractor={(item: ProductDef, index) => `${item._id || ""}${index}`}
              ListFooterComponent={<ActivityIndicator size="large" color="#ee4d2d" />}
              renderItem={(product) => (
                <View
                  style={{
                    width: (screenWidth - 16) / 2 - 4
                  }}>
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
        <TouchableOpacity
          className="flex-1 bg-[#26a997] flex-col justify-center items-center py-1"
          onPress={() => {
            setIsAddToCart(true);
            setIsVisibleModalAddToCart(true);
          }}>
          <FontAwesome name="cart-plus" size={28} color="#fff" />
          <Text className="text-white text-xs">Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-[#ee4d2d] flex-row items-center justify-center py-1"
          onPress={() => {
            setIsAddToCart(false);
            setIsVisibleModalAddToCart(true);
          }}>
          <Text className="text-white text-base">Mua ngay</Text>
        </TouchableOpacity>
      </View>

      <AddToCartModal
        isAddToCart={isAddToCart}
        product={product}
        isVisible={isVisibleModalAddToCart}
        close={() => setIsVisibleModalAddToCart(false)}
      />
    </SafeAreaView>
  );
};

export default memo(ProductDetailScreen);
