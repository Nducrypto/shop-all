import React, {useState} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import globalStyle from '../../constants/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAuthentication} from '../../actions/usersAction';
import {useUserState} from '../recoilState/userState';
import {auth, signOut} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetStarted, GetStarted} from '../recoilState/getStartedState';
import {screen} from '../../constants/screens';
import {
  useGlobalState,
  GlobalStateProps,
} from '../../components/recoilState/globalState';
import {getStartedStorageKey} from '../../constants/utils';

const CustomDrawerContent = (props: any) => {
  useAuthentication();
  const {setGlobalState} = useGlobalState();

  const [selectedScreen, setSelectedScreen] = useState<string>('Home');
  const navigation = useNavigation<any>();
  const {currentUser} = useUserState();
  const {setGetStarted} = useGetStarted();

  function handleNavigation(screenName: string, label: string) {
    if (screenName === screen.search) {
      navigateToSearch(screenName, label);
      return;
    }
    navigation.navigate(screenName);
    setSelectedScreen(label);
  }

  function navigateToSearch(screen: string, label: string) {
    setSelectedScreen('Home');
    setGlobalState((prev: GlobalStateProps) => ({
      ...prev,
      searchTitle: label,
    }));
    navigation.navigate(screen, {
      category: label,
    });
  }

  const isSeller = currentUser?.role === 'Admin';

  async function handleSignOut() {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem(getStartedStorageKey);
      setGetStarted((prev: GetStarted) => ({
        ...prev,
        hasUserVisitedBefore: false,
      }));
      setSelectedScreen('Home');
      navigation.navigate(screen.homeStack);
    } catch (error) {}
  }

  const screens = [
    {label: 'Home', icon: 'home', screen: screen.homeStack, IconType: Feather},
    {
      label: 'Women',
      icon: 'users',
      screen: screen.search,
      IconType: Feather,
    },
    {
      label: 'Men',
      icon: 'users',
      screen: screen.search,
      IconType: Feather,
    },

    ...(currentUser && currentUser?.email
      ? [
          {
            label: 'Profile',
            icon: 'user',
            screen: screen.profileStack,
            IconType: EvilIcons,
          },
          {
            label: 'Settings',
            icon: 'cog',
            screen: screen.settingsStack,
            IconType: Entypo,
          },
        ]
      : []),
    ...(currentUser && currentUser?.role === 'Admin'
      ? [
          {
            label: 'Customer Care',
            icon: 'users',
            screen: screen.customerCare,
            IconType: Feather,
          },
          {
            label: 'Add Product',
            icon: 'users',
            screen: screen.addProduct,
            IconType: Feather,
          },
        ]
      : []),
  ];

  return (
    <View style={styles.drawerContent}>
      <View style={styles.header}>
        {currentUser && currentUser?.email ? (
          <TouchableWithoutFeedback
            onPress={() => {
              handleNavigation(screen.profileStack, ''),
                setSelectedScreen(screen.profile);
            }}>
            <View style={styles.profile}>
              {currentUser?.profilePic ? (
                <Image
                  source={{uri: currentUser?.profilePic}}
                  style={styles.avatar}
                />
              ) : (
                <View
                  style={[
                    styles.avatar,
                    {
                      alignItems: 'center',
                      backgroundColor: 'grey',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text style={styles.authText}>
                    {currentUser.userName.charAt(0)}
                  </Text>
                </View>
              )}

              <Text
                style={{fontSize: 18, color: 'white', fontWeight: '600'}}
                numberOfLines={1}>
                {currentUser?.userName}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                {isSeller && (
                  <View style={styles.pro}>
                    <Text style={{fontSize: 14, color: 'white'}}>Pro</Text>
                  </View>
                )}

                <Text
                  style={{
                    ...styles.seller,
                    fontSize: 15,
                    color: 'white',
                    fontWeight: '300',
                  }}>
                  {isSeller ? 'Seller' : 'Buyer'}
                </Text>

                <Text style={{fontSize: 16, color: globalStyle.COLORS.WARNING}}>
                  4.8{' '}
                  <AntDesign
                    name="star"
                    size={14}
                    color={globalStyle.COLORS.WARNING}
                  />
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={{height: 105}} />
        )}
      </View>

      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.menu}>
          {screens.map((screen, index) => (
            <View
              style={[
                styles.menuItem,
                {
                  ...(screen.label === selectedScreen && {
                    backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
                  }),
                },
              ]}
              key={index}>
              <DrawerItem
                icon={({color, size}) => (
                  <screen.IconType
                    name={screen.icon}
                    size={19}
                    color={selectedScreen === screen.label ? 'white' : 'grey'}
                  />
                )}
                label={screen.label}
                onPress={() => {
                  handleNavigation(screen.screen, screen.label);
                }}
                labelStyle={{
                  fontSize: 16,
                  color: selectedScreen === screen.label ? 'white' : 'black',
                }}
              />
            </View>
          ))}
        </View>
      </DrawerContentScrollView>
      <View style={styles.authButtonCon}>
        {currentUser && currentUser?.email ? (
          <TouchableOpacity
            style={{...styles.authBut, top: 30}}
            onPress={handleSignOut}>
            <AntDesign name="logout" size={17} color="grey" />
            <Text style={styles.authText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.authBut}
              onPress={() => handleNavigation(screen.signIn, 'Home')}>
              <MaterialCommunityIcons name="import" size={22} color="grey" />
              <Text style={styles.authText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.authBut, top: 20}}
              onPress={() => handleNavigation(screen.signUp, 'Home')}>
              <Feather name="user-plus" size={20} color="grey" />
              <Text style={styles.authText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#0B6623',
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  menu: {
    paddingHorizontal: 10,
    flex: 1,
  },
  menuItem: {
    borderRadius: 9,
  },

  profile: {
    marginBottom: 10,
  },

  pro: {
    backgroundColor: globalStyle.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  },
  authButtonCon: {
    flex: 0.4,
    paddingLeft: 30,
    marginTop: 20,
  },
  authBut: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  authText: {
    fontSize: 16,
    color: 'black',
  },
});
