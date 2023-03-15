// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_ROUTES, AuthStack } from "app/features/auth/routes/auth.routes";
import { PRODUCT_ROUTES } from "app/features/product/routes/product.route";
import HomeScreen from "app/features/home/screens/HomeScreen";
import { CART_ROUTES, CartStack } from "app/features/cart/routes/cart.route";

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
          }}></AuthStack.Screen>
      ))}
    </AuthStack.Navigator>
  );
};

export const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      {CART_ROUTES.map((route) => (
        <CartStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false
          }}></CartStack.Screen>
      ))}
    </CartStack.Navigator>
  );
};

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={HomeScreen}
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
          }}></RootStack.Screen>
      ))}
    </RootStack.Navigator>
  );
};
function Routes() {
  return <AuthStackScreen />;
}

export default Routes;
