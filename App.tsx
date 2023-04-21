// In App.js in a new project

import * as React from "react";
import { StoreProvider } from "easy-peasy";
import store from "app/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS_IN_ASYNC_STORAGE, CART_IN_ASYNC_STORAGE } from "app/constants/common.constants";
import NavigationContainerRoute from "app/routes/NavigationContainer";

const Tab = createBottomTabNavigator();

Tab.Navigator;

function App() {
  React.useEffect(() => {
    AsyncStorage.removeItem(CART_IN_ASYNC_STORAGE);
    AsyncStorage.removeItem(ADDRESS_IN_ASYNC_STORAGE);
  }, []);

  return (
    <StoreProvider store={store}>
      <NavigationContainerRoute />
    </StoreProvider>
  );
}

export default App;
