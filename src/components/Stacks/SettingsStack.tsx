import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Cart,
  Chat,
  Navbar,
  PrivacyPolicy,
  About,
  UserAgreement,
  PaymentOptions,
  GiftCards,
  Notifications,
  MenuToggleIcon,
  Settings,
} from '../index';
import {RootStackParamList, screenNames} from '../../screen';

const Tab = createStackNavigator<RootStackParamList>();
const SettingsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name={screenNames.settings}
        options={{
          title: screenNames.settings,
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Settings}
      />
      <Tab.Screen
        name={screenNames.notifications}
        options={{headerRight: () => <Navbar />}}
        component={Notifications}
      />

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
        name={screenNames.chat}
        options={{
          title: 'Ndubuisi Agbo',
        }}
        component={Chat}
      />
      <Tab.Screen
        name={screenNames.paymentOptions}
        options={{
          title: 'Payment Options',
        }}
        component={PaymentOptions}
      />
      <Tab.Screen name={screenNames.giftCard} component={GiftCards} />
      <Tab.Screen name={screenNames.userAgreement} component={UserAgreement} />
      <Tab.Screen
        name={screenNames.privacy}
        options={{
          title: 'Privacy Policy',
        }}
        component={PrivacyPolicy}
      />
      <Tab.Screen name={screenNames.about} component={About} />
    </Tab.Navigator>
  );
};

export default SettingsStack;
