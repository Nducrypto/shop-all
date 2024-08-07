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
import {LogBox, StatusBar, useColorScheme} from 'react-native';
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
import {GalioProvider} from 'galio-framework';
import globalStyle from './constants/globalStyle';
import ProfileStack from './components/Stacks/ProfileStack';
import {screen} from './constants/screens';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <GalioProvider theme={globalStyle}>
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
                  width: 270,
                },
              }}
              initialRouteName={screen.homeStack}>
              <Drawer.Screen
                options={{
                  headerShown: false,
                }}
                name={screen.homeStack}
                component={HomeStack}
              />

              <Drawer.Screen
                name={screen.profileStack}
                options={{
                  headerShown: false,
                }}
                component={ProfileStack}
              />
              <Drawer.Screen
                name={screen.settingsStack}
                options={{
                  headerShown: false,
                }}
                component={SettingsStack}
              />
              <Drawer.Screen
                name={screen.customerCare}
                options={{
                  title: 'Chat',
                }}
                component={CustomerCare}
              />
              <Drawer.Screen name={screen.addProduct} component={AddProduct} />
            </Drawer.Navigator>
          </NavigationContainer>
          <CustomToast />
        </GalioProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}

export default App;
