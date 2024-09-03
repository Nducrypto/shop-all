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
  ForgotPassword,
  Products,
} from '../index';
import {useGetStarted} from '../../hook/useGetStarted';
import {screenNames} from '../../screen';
import {useGlobalState} from '../../hook/useGlobal';
import {useAuthentication} from '../../actions/usersAction';

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
      name: screenNames.productList,
      component: Products,
      options: {
        title: 'Home',
        headerLeft: () => <MenuToggleIcon />,
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screenNames.bestDeals,
      component: BestDeals,
    },
    {
      name: screenNames.categories,
      component: Categories,
      options: {headerRight: () => <Navbar />},
    },
    {
      name: screenNames.search,
      component: Search,
      options: {
        title: searchTitle,
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screenNames.productDetail,
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
      name: screenNames.chat,
      component: Chat,
      options: {
        title: 'Ndubuisi Agbo',
      },
    },
    {
      name: screenNames.cart,
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
      name: screenNames.signIn,
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
      name: screenNames.forgotPassword,
      component: ForgotPassword,
      options: {
        title: 'Forgot Password',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
    {
      name: screenNames.signUp,
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
