import { Button, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";

type Props = NativeStackScreenProps<RootStackParams>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <Button title="Login" onPress={() => navigation.navigate(RoutesNameEnum.LOGIN)} />
      <View>
        <Text className="text-red-400">Đăng nhập</Text>
      </View>
      <View></View>
    </SafeAreaView>
  );
}
