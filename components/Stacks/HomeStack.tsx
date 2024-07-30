import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ProductDetail,
  MenuToggleIcon,
  Categories,
  BestDeals,
  Search,
  SignIn,
  SignUp,
  Navbar,
  Cart,
  Chat,
  GetStarted,
} from '../index';
import ProductList from '../ProductsList/ProductList';
import {useGetStarted} from '../recoilState/getStartedState';
import {useAuthentication} from '../../actions/usersAction';
import {screen} from '../../constants/screens';
import {useGlobalState} from '../../components/recoilState/globalState';

const Tab = createStackNavigator();

const HomeStack = () => {
  useAuthentication();
  const {hasUserVisitedBefore} = useGetStarted();
  const {searchTitle} = useGlobalState();
  const defaultScreenOptions = {
    headerBackTitleVisible: false,
    headerTintColor: 'black',
  };

  const routes = [
    {
      name: screen.productList,
      component: ProductList,
      options: {
        title: 'Home',
        headerLeft: () => <MenuToggleIcon />,
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screen.bestDeals,
      component: BestDeals,
    },
    {
      name: screen.categories,
      component: Categories,
      options: {headerRight: () => <Navbar />},
    },
    {
      name: screen.search,
      component: Search,
      options: {
        title: searchTitle,
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screen.productDetail,
      component: ProductDetail,
      options: {
        headerTitle: '',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerRight: () => <Navbar search />,
      },
    },
    {
      name: screen.chat,
      component: Chat,
      options: {
        title: 'Ndubuisi Agbo',
      },
    },
    {
      name: screen.cart,
      component: Cart,
      options: {
        headerTitle: 'Shopping Cart',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'black',
      },
    },
    {
      name: screen.signIn,
      component: SignIn,
      options: {
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
    {
      name: screen.signUp,
      component: SignUp,
      options: {
        title: 'Create Account',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
  ];

  return (
    <Tab.Navigator screenOptions={defaultScreenOptions}>
      {hasUserVisitedBefore ? (
        routes.map(route => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      ) : (
        <Tab.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

export default HomeStack;
