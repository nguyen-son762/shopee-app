import React, { FC, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ProductDef } from "../types/product.type";
import { URL_IMAGE_CLOUDIARY } from "@env";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { convertNumberToPrice } from "app/utils/convertPrice";

type ProductProps = {
  product: ProductDef;
  width: number;
  navigation: NativeStackNavigationProp<RootStackParams, any, undefined>;
};

const Product: FC<ProductProps> = ({ product, width, navigation }) => {
  const { thumb_url, name, price } = product;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push(RoutesNameEnum.PRODUCT_DETAIL, {
          item: product
        })
      }
    >
      <View className="bg-white pb-3 w-full">
        <Image
          source={{
            uri: `${URL_IMAGE_CLOUDIARY || ""}/${thumb_url}`,
            width: width,
            height: 200
          }}
        />
        <Text className="mt-2 mx-2" numberOfLines={2}>
          {name}
        </Text>
        <View>
          <Text className="text-primary mt-2 text-base ml-2">{convertNumberToPrice(price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Product);
