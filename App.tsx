// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "easy-peasy";
import store from "app/store";
import Routes from "app/routes/Routes";
import CustomToast from "app/components/Toast/CustomToast";

function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
