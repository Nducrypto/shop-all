import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuToggleIcon from '../CustomDrawerContent/MenuToggleIcon';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import UserAgreement from '../User-Agreement/UserAgreement';
import {Cart, Chat, Navbar, ComingSoon, PrivacyPolicy, About} from '../index';
import {screen} from '../../constants/screens';
import {useUserState} from '../recoilState/userState';

const Tab = createStackNavigator<any>();
const SettingsStack = () => {
  const {currentUser} = useUserState();
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <Tab.Screen
        name={screen.settings}
        options={{
          title: screen.settings,
          headerLeft: () => <MenuToggleIcon />,
          headerRight: () => <Navbar />,
        }}
        component={Settings}
      />
      <Tab.Screen
        name={screen.notifications}
        options={{headerRight: () => <Navbar />}}
        component={Notifications}
      />

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
      <Tab.Screen
        name={screen.chat}
        options={{
          title: currentUser?.userName,
        }}
        component={Chat}
      />
      <Tab.Screen
        name={screen.paymentOptions}
        options={{
          title: 'Payment Options',
        }}
        component={ComingSoon}
      />
      <Tab.Screen name={screen.giftCard} component={ComingSoon} />
      <Tab.Screen name={screen.userAgreement} component={UserAgreement} />
      <Tab.Screen
        name={screen.privacy}
        options={{
          title: 'Privacy Policy',
        }}
        component={PrivacyPolicy}
      />
      <Tab.Screen name={screen.about} component={About} />
    </Tab.Navigator>
  );
};

export default SettingsStack;
