/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-reanimated';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
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
