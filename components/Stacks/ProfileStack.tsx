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
  Search,
} from '../index';
import {screen} from '../../constants/screens';
import {useGlobalState} from '../../components/recoilState/globalState';

const Tab = createStackNavigator<any>();
const ProfileStack = () => {
  const {searchTitle} = useGlobalState();

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
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'black',
        }}
        component={Cart}
      />
      <Tab.Screen
        name={screen.search}
        options={{
          title: searchTitle,
          headerRight: () => <Navbar />,
        }}
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default ProfileStack;
