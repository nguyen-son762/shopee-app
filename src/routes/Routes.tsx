// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_ROUTES, AuthStack } from "app/features/auth/routes/auth.routes";
import { PRODUCT_ROUTES } from "app/features/product/routes/product.route";
import HomeScreen from "app/features/home/screens/HomeScreen";
import { CART_ROUTES, CartStack } from "app/features/cart/routes/cart.route";
import PaymentScreen from "app/features/payment/screens/PaymentScreen";
import { RoutesNameEnum } from "app/types/routes.types";
import SearchScreen from "app/features/search/screens/SearchScreen";
import { PROFILE_ROUTES, ProfileStack } from "app/features/profile/routes/profile.route";
import OrderScreen from "app/features/cart/screens/OrderScreen";
import CartScreen from "app/features/cart/screens/CartScreen";

const RootStack = createNativeStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      {AUTH_ROUTES.map((route) => (
        <AuthStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false
          }}
        ></AuthStack.Screen>
      ))}
    </AuthStack.Navigator>
  );
};

export const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false
        }}
      ></CartStack.Screen>
    </CartStack.Navigator>
  );
};

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      {PROFILE_ROUTES.map((route) => (
        <ProfileStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false
          }}
        ></ProfileStack.Screen>
      ))}
      <CartStack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false
        }}
      ></CartStack.Screen>
    </ProfileStack.Navigator>
  );
};

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={RoutesNameEnum.HOME}
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <RootStack.Screen
        name={RoutesNameEnum.SEARCH}
        component={SearchScreen}
        options={{
          headerShown: false
        }}
      />
      {PRODUCT_ROUTES.map((route) => (
        <RootStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false
          }}
        ></RootStack.Screen>
      ))}
      <RootStack.Screen
        name={RoutesNameEnum.PAYMENT}
        component={PaymentScreen}
        options={{
          headerShown: false
        }}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
};
function Routes() {
  return <AuthStackScreen />;
}

export default Routes;
