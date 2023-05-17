import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomButton from "app/components/CustomButton";
import DefaultLayout from "app/components/layouts/DefaultLayout";
import { Theme } from "app/constants/theme.constants";
import ProductLoader from "app/features/home/components/ProductLoader";
import Product from "app/features/product/components/Product";
import { useStoreDispatch, useStoreState } from "app/store";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { isCloseToBottom } from "app/utils/closeToBottom";
import { Formik } from "formik";
import React, { FC, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";

type SearchScreenProps = NativeStackScreenProps<RootStackParams>;

type initialForm = {
  keyword: string;
};

const screenWidth = Dimensions.get("window").width;

const SearchScreen: FC<SearchScreenProps> = ({ route, navigation }) => {
  const keyword = (route.params as any).keyword || "";
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const {
    products: { getProductsBySearch, resetBySearch }
  } = useStoreDispatch();
  const handleCallApi = async () => {
    try {
      setLoading(true);
      const result = await getProductsBySearch({
        limit: 10,
        keyword
      });
      if (result.page === result.totalPage) {
        setIsEnd(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleCallApi();
      return () => {
        resetBySearch();
      };
    }, [])
  );
  const { productsBySearch, pageBySearch, totalPageBySearch } = useStoreState(
    (state) => state.products
  );
  const handleSubmitForm = (value: initialForm) => {
    navigation.replace(RoutesNameEnum.SEARCH, {
      keyword: value.keyword
    });
  };
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent)) {
      handleLoadMore();
    }
  };

  const handleLoadMore = async () => {
    if (pageBySearch + 1 > totalPageBySearch || isEnd) {
      setIsEnd(true);
      return;
    }
    await getProductsBySearch({
      limit: 10,
      page: pageBySearch + 1
    });
  };

  return (
    <DefaultLayout>
      <View className="flex-row h-10 items-center px-2 mb-7">
        <Ionicons
          name="arrow-back"
          onPress={() => navigation.goBack()}
          size={28}
          color={Theme.color.primary}
        />
        <Formik
          initialValues={{
            keyword
          }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <TextInput
                className="h-full flex-1 px-3 ml-1"
                placeholder="Tìm kiếm"
                style={{
                  borderWidth: 1,
                  borderColor: Theme.color.primary,
                  borderBottomLeftRadius: 6,
                  borderTopLeftRadius: 6
                }}
                value={values.keyword}
                onChangeText={handleChange("keyword")}
                onSubmitEditing={() => handleSubmit()}
              />
              <CustomButton
                classNames="h-full w-12 flex-row justify-center items-center"
                onPress={() => handleSubmit()}
                icon={AntDesign}
                iconName="search1"
                size={22}
                iconColor={Theme.color.white}
                style={{
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                  overflow: "hidden"
                }}
              />
            </>
          )}
        </Formik>
      </View>
      <ScrollView onScroll={(e) => handleScroll(e)}>
        <View className="bg-transparent mx-2">
          {loading ? (
            <ProductLoader />
          ) : (
            <FlatList
              initialNumToRender={0}
              numColumns={2}
              data={productsBySearch}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 10
              }}
              keyExtractor={(item, index) => `${item._id || ""}${index}`}
              ListFooterComponent={
                isEnd || productsBySearch.length === 0 ? (
                  <Text className="text-center text-primary">Tất cả sản phầm đã được hiển thị</Text>
                ) : (
                  <ActivityIndicator size="large" color="#ee4d2d" />
                )
              }
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
      </ScrollView>
    </DefaultLayout>
  );
};

export default SearchScreen;
