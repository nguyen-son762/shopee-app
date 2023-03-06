// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams, RouteItemDef } from "app/types/routes.types";
import { ROUTE_LIST } from "./routes.config";

const RootStack = createNativeStackNavigator<RootStackParams>();

const routeWrapper = ({ name, component, presentation = "card" }: RouteItemDef) => {
  return (
    <RootStack.Screen
      key={name}
      name={name}
      component={component}
      options={{
        headerShown: false,
        presentation
      }}
    />
  );
};
function Routes() {
  return (
    <>
      <RootStack.Navigator>{ROUTE_LIST.map((route) => routeWrapper(route))}</RootStack.Navigator>
    </>
  );
}

export default Routes;
