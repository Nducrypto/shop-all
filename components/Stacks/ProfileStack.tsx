import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ProductDetail,
  MenuToggleIcon,
  Navbar,
  Cart,
  Chat,
  Profile,
  Order,
} from '../index';
import {screen} from '../../constants/screens';

const Tab = createStackNavigator<any>();
const ProfileStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name={screen.profile}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Profile}
      />

      <Tab.Screen
        name={screen.productDetail}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },

          headerRight: () => <Navbar search />,
        }}
        component={ProductDetail}
      />
      <Tab.Screen
        name={screen.chat}
        options={{
          title: 'Ndubuisi Agbo',
        }}
        component={Chat}
      />
      <Tab.Screen name={screen.orders} component={Order} />
      <Tab.Screen
        name={screen.cart}
        options={{
          headerTitle: 'Shopping Cart',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'black',
        }}
        component={Cart}
      />
    </Tab.Navigator>
  );
};

export default ProfileStack;
