import { useStoreDispatch } from "app/store";
import React, { memo } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

const screenWidth = Dimensions.get("window").width;

const slides = [
  require("app/assets/images/slide1.jpeg"),
  require("app/assets/images/slide2.jpeg"),
  require("app/assets/images/slide3.jpeg")
];

const categories = [
  {
    image: require("app/assets/images/female_thumbnail.jpg"),
    title: "Thời trang nữ",
    id: '64098e1bb25d32b440aeb765'
  },
  {
    image: require("app/assets/images/male_thumbnail.jpg"),
    title: "Thời trang nam",
    id:'64098e1bb25d32b440aeb764'
  }
];

type Props = {
  changeCategory: (id: string) => void
}

const Category = (props: Props) => {
  const {
    products: { getProducts }
  } = useStoreDispatch();
  const handleClickCategory = async(id: string)=>{
    props.changeCategory(id)
  }
  return (
    <View className="mb-1">
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        data={slides}
        renderItem={({ item }) => (
          <View>
            <Image
              source={item}
              style={{
                width: screenWidth,
                height: 150
              }}
            />
          </View>
        )}
      />

      <View className="mt-1 pt-2 pb-2 flex-row gap-x-8 px-2 bg-white">
        {categories.map((category) => {
          return (
            <TouchableOpacity onPress={()=>handleClickCategory(category.id)} className="flex-1 p-1 rounded-3xl bg-white" key={category.title}>
              <View
                className="rounded-xl"
                style={{ borderColor: "#e4e4e4", borderWidth: 1, padding: 0.8 }}
              >
                <Image
                  className="rounded-xl"
                  source={category.image}
                  style={{
                    height: 60,
                    width: "100%",
                    resizeMode: "cover"
                  }}
                />
              </View>
              <Text className="text-center mt-1">{category.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(Category);
