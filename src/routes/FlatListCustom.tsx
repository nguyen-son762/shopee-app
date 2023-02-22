import React, { useRef, useState } from "react";
import { Button, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemData = {
  id: string;
  title: string;
};

const FlatListCustom = () => {
  const refList = useRef<FlatList<ItemData> | null>(null);
  const [data, setData] = useState<ItemData[]>(
    Array.from({ length: 10 }).map((_, index) => ({
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba" + index,
      title: "First Item" + index
    }))
  );
  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <TouchableOpacity style={[styles.item, { backgroundColor: "#f9c2ff" }]}>
        <Text style={[styles.title, { color: "black" }]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const changeToIndex = () => {
    refList.current?.scrollToIndex({
      index: 3,
      animated: true
    });
  };
  const loadMore = () =>{
    setData([...data,{
      id: "123" ,
      title: "First Item test"
    }])
  }

  return (
    <View>
      <FlatList
        style={{
          display: "flex",
          height: 300
        }}
        data={data}
        initialNumToRender={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<Button title={`change data`}></Button>}
        getItemLayout={(data, index) => ({ length: 10, offset: 200 * index, index })}
        ref={refList}
        ListEmptyComponent={<Button title="no data"></Button>}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        )}
        onEndReached={loadMore}
      />
      <Text>Test</Text>
      <Button title="Scroll" onPress={changeToIndex}></Button>
      <Button title="Scroll" onPress={changeToIndex}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  taskItem: {
    padding: 10,
    marginVertical: 15,
    fontSize: 16
  },
  taskTitle: {
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10
  },
  separator: {
    backgroundColor: "red"
  }
});

export default FlatListCustom;
