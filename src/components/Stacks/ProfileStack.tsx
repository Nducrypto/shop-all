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
import {RootStackParamList, screenNames} from '../../screen';
import {useGlobalState} from '../../hook/useGlobal';
import {useUserState} from '../../hook/useUsers';

const Tab = createStackNavigator<RootStackParamList>();
const ProfileStack = () => {
  const {searchTitle} = useGlobalState();
  const {currentUser} = useUserState();

  const titleColor = currentUser?.profilePic ? 'black' : 'lightgray';

  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name={screenNames.profile}
        options={{
          headerTransparent: true,
          headerTintColor: titleColor,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Profile}
      />
      <Tab.Screen
        name={screenNames.productDetail}
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
        name={screenNames.chat}
        options={{
          title: 'Ndubuisi Agbo',
        }}
        component={Chat}
      />
      <Tab.Screen name={screenNames.orders} component={Order} />
      <Tab.Screen
        name={screenNames.cart}
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
        name={screenNames.search}
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
