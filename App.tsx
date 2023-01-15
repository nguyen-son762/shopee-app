// In App.js in a new project

import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "app/features/auth/screens/LoginScreen";
import HomeScreen from "app/features/home/screens/HomeScreen";
import { RootStackParams, RoutesNameEnum } from "app/types/routes.types";
import { StoreProvider } from "easy-peasy";
import store from "app/store";

const RootStack = createNativeStackNavigator<RootStackParams>();

function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name={RoutesNameEnum.HOME}
            component={HomeScreen}
            options={{
              headerShown: false,
              presentation: "modal"
            }}
          />
          <RootStack.Screen
            name={RoutesNameEnum.LOGIN}
            component={LoginScreen}
            options={{
              headerShown: false,
              presentation: "fullScreenModal"
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
