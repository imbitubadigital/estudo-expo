import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import RestaurantsStacks from './RestaurantsStacks';

const NavigationStacks = createBottomTabNavigator({
  // stacks
  Restaurants: {
    screen: RestaurantsStacks,
    navigationOptions: () => ({
      tabBarLabel: 'Restaurantes',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      ),
    }),
  },
});

export default createAppContainer(NavigationStacks);
