import React, { useState } from "react";
import { Button, SafeAreaView, SectionList, Text, View } from "react-native";
import FlatListCustom from "./FlatListCustom";
import SectionListCustom from "./SectionListCustom";
import BackHandlerCustom from "./BackHandlerCustom";
import DrawerLayoutAndroidCustom from "./DrawerLayoutAndroidCustom";
import PermissonAndroidCustom from "./PermissonAndroidCustom";
import ToastAndroidCustom from "./ToastAndroidCustom";

const Demo = () => {
  const [count, setCount] = useState(1)
  const changeCount = ()=>{
    setCount((pre)=> 2)
    console.warn('count',count)
  }
  return (
    <View style={{
      marginTop:100
    }}>

      {/* <FlatListCustom /> */}
      {/* <SectionListCustom /> */}
      {/* <BackHandlerCustom /> */}
      {/* <DrawerLayoutAndroidCustom /> */}
      {/* <PermissonAndroidCustom /> */}
      {/* <ToastAndroidCustom /> */}
      <Button title="Change count" onPress={changeCount}></Button>
      <Text>{count}</Text>
    </View>
  );
};

export default Demo;
