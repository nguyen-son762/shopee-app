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
  LogBox,
  Text
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import Header from "../components/HomeHeader";
import { Dimensions } from "react-native";
import SearchModal from "../components/SearchModal";
import { useStoreDispatch, useStoreState } from "app/store";
import Product from "app/features/product/components/Product";
import Category from "../components/Category";
import ProductLoader from "../components/ProductLoader";
import { isCloseToBottom } from "app/utils/closeToBottom";
import DropDownPicker from "react-native-dropdown-picker";
import { Theme } from "app/constants/theme.constants";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParams>;

export default function HomeScreen({ route, navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [sortFields, setSortFields] = useState([
    { label: "Mặc định", value: "" },
    { label: "Giá tăng dần", value: "asc" },
    { label: "Giá giảm dần", value: "desc" }
  ]);
  const {
    products: { getProducts, reset }
  } = useStoreDispatch();
  const { products, page, totalPage } = useStoreState((state) => state.products);
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
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent)) {
      handleLoadMore();
    }
  };
  const handleLoadMore = async () => {
    if (page + 1 > totalPage || isEnd) {
      setIsEnd(true);
      return;
    }
    await getProducts({
      limit: 10,
      page: page + 1,
      sort: filterType ? filterType : undefined
    });
  };

  const handleSearch = (keyword: string) => {
    navigation.navigate(RoutesNameEnum.SEARCH, {
      keyword
    });
    setModalVisible(false);
  };

  const filterByPrice = async (value: string | null) => {
    try {
      setLoading(true);
      reset();
      await getProducts({
        limit: 10,
        sort: value ? value : undefined
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Header openSearchModal={() => setModalVisible(true)} />
      <SearchModal
        open={modalVisible}
        close={() => setModalVisible(false)}
        onSearch={(keyword) => handleSearch(keyword)}
      />
      <ScrollView onScroll={(e) => handleScroll(e)}>
        <Category />
        <View className="relative z-20 my-3">
          <DropDownPicker
            style={{
              borderColor: Theme.color.primary,
              width: 200
            }}
            placeholder="Sắp xếp theo giá"
            textStyle={{
              color: Theme.color.primary
            }}
            dropDownContainerStyle={{
              borderColor: Theme.color.primary
            }}
            open={open}
            value={filterType}
            items={sortFields}
            setOpen={setOpen}
            setValue={setFilterType}
            setItems={setSortFields}
            onChangeValue={(e) => filterByPrice(e)}
          />
        </View>
        <View className="bg-transparent mx-2 relative z-10">
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
              ListFooterComponent={
                isEnd ? (
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
