import { createStackNavigator } from 'react-navigation-stack';
import Account from '~/pages/Account';

const AcountStacks = createStackNavigator({
  AcountUser: {
    screen: Account,
    navigationsOptions: () => ({
      title: 'Minha conta',
    }),
  },
});

export default AcountStacks;
