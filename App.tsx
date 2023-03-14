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
import { AuthStackScreen, RootStackScreen } from "app/routes/Routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailScreen from "app/features/product/screens/ProductDetailScreen";
import { RoutesNameEnum } from "app/types/routes.types";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
