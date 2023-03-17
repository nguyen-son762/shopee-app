import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeScrollSize,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  View,
  LogBox
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "app/types/routes.types";
import Header from "../components/HomeHeader";
import { Dimensions } from "react-native";
import SearchModal from "../components/SearchModal";
import { useStoreDispatch, useStoreState } from "app/store";
import Product from "app/features/product/components/Product";
import Category from "../components/Category";
import ProductLoader from "../components/ProductLoader";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParams>;

export default function HomeScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    products: { getProducts }
  } = useStoreDispatch();
  const { products } = useStoreState((state) => state.products);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleCallApi = async () => {
    try {
      setLoading(true);
      await getProducts({
        limit: 10
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCallApi();
  }, [getProducts, handleCallApi]);

  const isCloseToBottom = ({
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
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent)) {
      handleLoadMore();
    }
  };
  const handleLoadMore = () => {};

  return (
    <SafeAreaView>
      <Header openSearchModal={() => setModalVisible(true)} />
      <SearchModal open={modalVisible} close={() => setModalVisible(false)} />
      <ScrollView onScroll={(e) => handleScroll(e)}>
        <Category />
        {/* <Button title="Modal" onPress={() => setModalVisible(true)} />

      <Button title="Login" onPress={() => navigation.navigate(RoutesNameEnum.LOGIN)} />
      <Button title="Verify" onPress={() => navigation.navigate(RoutesNameEnum.VERIFY_OTP)} /> */}
        <View className="bg-transparent mx-2">
          {loading ? (
            <ProductLoader />
          ) : (
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
          )}
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            height: 60,
            width: "100%"
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
}
