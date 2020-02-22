import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import AcountScreen from '~/pages/Account';
import RestaurantsScreen from '~/pages/Restaurants';
import Top5Screen from '~/pages/Restaurants/Top';
import SearchScreen from '~/pages/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Restaurantes" component={RestaurantsScreen} />
    </Stack.Navigator>
  );
}

function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top 5" component={Top5Screen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pesquisar Restaurantes" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Minha Conta" component={AcountScreen} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Restaurantes"
          component={RestaurantsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Top 5"
          component={TopRestaurantsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Busca"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
