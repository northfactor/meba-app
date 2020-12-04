import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// // You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const Header = () => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <View style={{ width: 180, marginRight: 16 }}>
      <Image
        style={{ width: 180, height: 41 }}
        source={require("../assets/images/cofactor_horizontal.png")}
      />
    </View>
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text>MEBA</Text>
    </View>
  </View>
);

export const TabOneNavigator = () => {
  return (
    <TabOneStack.Navigator
      screenOptions={{  
        headerStyle: {
          height: 96,
        },
      }}
    >
      <TabOneStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: () => <Header /> }}
      />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
