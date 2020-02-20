import { createStackNavigator } from 'react-navigation-stack';
import RestaurantsPage from '~/pages/Restaurants';

const RestaurantsStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsPage,
    navigationsOptions: () => ({
      title: 'Restaurantes',
    }),
  },
});

export default RestaurantsStacks;
