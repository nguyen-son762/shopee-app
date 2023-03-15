// In App.js in a new project

import * as React from "react";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
  getFocusedRouteNameFromRoute
} from "@react-navigation/native";
import { StoreProvider } from "easy-peasy";
import store from "app/store";
import { AuthStackScreen, RootStackScreen, CartStackScreen } from "app/routes/Routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesNameEnum } from "app/types/routes.types";

const Tab = createBottomTabNavigator();

Tab.Navigator;

function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={({ route }) => ({
              tabBarLabel: ({ focused }) => (
                <Text className={focused ? "text-primary" : "text-[#5a5a5a]"}>Trang chủ</Text>
              ),
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="home"
                  size={24}
                  color={focused ? Theme.color.primary : "#5a5a5a"}
                />
              ),
              tabBarStyle: {
                display: getTabBarVisibility(route)
              },
              headerShown: false
            })}
            name="Root"
            component={RootStackScreen}
          />
          <Tab.Screen
            name="Cart"
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color={focused ? Theme.color.primary : "#5a5a5a"}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text className={focused ? "text-primary" : "text-[#5a5a5a]"}>Giỏ hàng</Text>
              ),
              headerShown: false
            }}
            component={CartStackScreen}
          />
          <Tab.Screen
            name="Auth"
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="user"
                  size={24}
                  color={focused ? Theme.color.primary : "#5a5a5a"}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text className={focused ? "text-primary" : "text-[#5a5a5a]"}>Tài khoản</Text>
              ),
              headerShown: false
            }}
            component={AuthStackScreen}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

const getTabBarVisibility = (route: RouteProp<ParamListBase, "Root">) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName == RoutesNameEnum.PRODUCT_DETAIL) {
    return "none";
  }
  return "flex";
};

export default App;
