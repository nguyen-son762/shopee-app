import {
  Button,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import Header from "../components/Header";
import { Dimensions } from "react-native";
import SearchModal from "../components/SearchModal";

const screenHeight = Dimensions.get("window").height;

type Props = NativeStackScreenProps<RootStackParams>;

export default function HomeScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isHaveSpaceToTop, setIsHaveSpaceToTop] = useState(false);
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 20) {
      setIsHaveSpaceToTop(true);
    } else {
      setIsHaveSpaceToTop(false);
    }
  };
  return (
    <ScrollView onScroll={(e) => handleScroll(e)}>
      <Header isHaveSpaceToTop={isHaveSpaceToTop} openSearchModal={() => setModalVisible(true)} />
      <SearchModal open={modalVisible} close={() => setModalVisible(false)} />
      <Button title="Modal" onPress={() => setModalVisible(true)} />

      <Button title="Login" onPress={() => navigation.navigate(RoutesNameEnum.LOGIN)} />
      <Button title="Verify" onPress={() => navigation.navigate(RoutesNameEnum.VERIFY_OTP)} />
      <View
        style={{
          height: screenHeight * 2
        }}
      >
        <Text className="text-red-400">Đăng nhập</Text>
      </View>
      <View></View>
    </ScrollView>
  );
}
