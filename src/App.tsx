import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-reanimated';
import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RecoilRoot} from 'recoil';
import {
  HomeStack,
  CustomToast,
  SettingsStack,
  CustomDrawerContent,
  CustomerCare,
  AddProduct,
} from './components/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ProfileStack from './components/Stacks/ProfileStack';
import {screenNames} from './screen/screenNames';
import {wp} from './config/appConfig';
LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerStyle: {
                backgroundColor: 'white',
                width: wp('68.6%'),
              },
            }}
            initialRouteName={screenNames.homeStack}>
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name={screenNames.homeStack}
              component={HomeStack}
            />

            <Drawer.Screen
              name={screenNames.profileStack}
              options={{
                headerShown: false,
              }}
              component={ProfileStack}
            />
            <Drawer.Screen
              name={screenNames.settingsStack}
              options={{
                headerShown: false,
              }}
              component={SettingsStack}
            />
            <Drawer.Screen
              name={screenNames.customerCare}
              options={{
                title: 'Chat',
              }}
              component={CustomerCare}
            />
            <Drawer.Screen
              name={screenNames.addProduct}
              component={AddProduct}
            />
          </Drawer.Navigator>
        </NavigationContainer>
        <CustomToast />
      </RecoilRoot>
    </SafeAreaProvider>
  );
}

export default App;
