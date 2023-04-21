import React from "react";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
  getFocusedRouteNameFromRoute
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Theme } from "app/constants/theme.constants";
import { RoutesNameEnum } from "app/types/routes.types";
import { AuthStackScreen, CartStackScreen, ProfileStackScreen, RootStackScreen } from "./Routes";
import { useStoreState } from "app/store";

const Tab = createBottomTabNavigator();

const NavigationContainerRoute = () => {
  const { user } = useStoreState((state) => state.auth);

  return (
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
          name="CartScreen"
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
            tabBarStyle: {
              display: "none"
            },
            headerShown: false
          }}
          component={CartStackScreen}
        />
        {!user ? (
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
        ) : (
          <Tab.Screen
            name="ProfileScreen"
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
            component={ProfileStackScreen}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const getTabBarVisibility = (route: RouteProp<ParamListBase, "Root">) => {
  const routeName = getFocusedRouteNameFromRoute(route) as RoutesNameEnum;

  if (
    [RoutesNameEnum.PRODUCT_DETAIL, RoutesNameEnum.PAYMENT, RoutesNameEnum.SEARCH].includes(
      routeName
    )
  ) {
    return "none";
  }
  return "flex";
};

export default NavigationContainerRoute;
