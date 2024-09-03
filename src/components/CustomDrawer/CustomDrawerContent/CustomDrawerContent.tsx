import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthentication} from '../../../actions/usersAction';
import {useUserState} from '../../../hook/useUsers';
import {auth, signOut} from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetStarted, GetStarted} from '../../../hook/useGetStarted';
import {
  screenNames,
  DynamicNavigationProps,
  RootStackParamList,
} from '../../../screen/';
import {useGlobalState, GlobalStateProps} from '../../../hook/useGlobal';
import {getStartedStorageKey, wp} from '../../../config/appConfig';
import {styles} from './customDrawerContentStyles';
import themes from '../../../config/themes';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  useAuthentication();
  const {setGlobalState} = useGlobalState();
  const [selectedLabel, setSelectedLabel] = useState<string>('Home');
  const navigation = useNavigation<DynamicNavigationProps>();
  const {currentUser} = useUserState();
  const {setGetStarted} = useGetStarted();
  const {COLORS, FONT_SIZES, ICONS} = themes;
  function handleNavigation(name: keyof RootStackParamList, label: string) {
    if (name === screenNames.search) {
      navigateToSearch(name, label);
      return;
    }
    navigation.navigate(name);
    setSelectedLabel(label);
  }

  function navigateToSearch(screen: keyof RootStackParamList, label: string) {
    setSelectedLabel('Home');
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
      setSelectedLabel('Home');
      navigation.navigate(screenNames.homeStack);
    } catch (error) {}
  }

  function isLabel(label: string) {
    return selectedLabel === label;
  }
  const screens = [
    {
      label: 'Home',
      icon: 'home',
      screen: screenNames.homeStack,
      IconType: Feather,
    },
    {
      label: 'Women',
      icon: 'users',
      screen: screenNames.search,
      IconType: Feather,
    },
    {
      label: 'Men',
      icon: 'users',
      screen: screenNames.search,
      IconType: Feather,
    },

    ...(currentUser && currentUser?.email
      ? [
          {
            label: 'Profile',
            icon: 'user',
            screen: screenNames.profileStack,
            IconType: EvilIcons,
          },
          {
            label: 'Settings',
            icon: 'cog',
            screen: screenNames.settingsStack,
            IconType: Entypo,
          },
        ]
      : []),
    ...(currentUser && currentUser?.role === 'Admin'
      ? [
          {
            label: 'Customer Care',
            icon: 'users',
            screen: screenNames.customerCare,
            IconType: Feather,
          },
          {
            label: 'Add Product',
            icon: 'users',
            screen: screenNames.addProduct,
            IconType: Feather,
          },
        ]
      : []),
  ];

  return (
    <View style={styles.drawerContent}>
      <View style={styles.header}>
        {currentUser && currentUser?.email && (
          <TouchableWithoutFeedback
            onPress={() => {
              handleNavigation(screenNames.profileStack, ''),
                setSelectedLabel(screenNames.profile);
            }}>
            <View style={styles.profile}>
              {currentUser?.profilePic ? (
                <Image
                  source={{uri: currentUser?.profilePic}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.authText}>
                    {currentUser.userName.charAt(0)}
                  </Text>
                </View>
              )}

              <Text style={styles.userName} numberOfLines={1}>
                {currentUser?.userName}
              </Text>
              <View style={styles.statusCon}>
                {isSeller && (
                  <View style={styles.proCon}>
                    <Text style={styles.pro}>Pro</Text>
                  </View>
                )}

                <Text style={styles.seller}>
                  {isSeller ? 'Seller' : 'Buyer'}
                </Text>

                <Text style={styles.rating}>
                  4.8{' '}
                  <AntDesign
                    name="star"
                    size={wp('4%')}
                    color={COLORS.WARNING}
                  />
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      <ScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuCon}>
        <View style={styles.menu}>
          {screens.map((screen, index) => (
            <View
              style={[
                styles.menuItem,
                {
                  ...(isLabel(screen.label) && {
                    backgroundColor: COLORS.BUTTON_COLOR,
                  }),
                },
              ]}
              key={index}>
              <DrawerItem
                icon={({color, size}) => (
                  <screen.IconType
                    name={screen.icon}
                    size={wp('4.4%')}
                    color={isLabel(screen.label) ? COLORS.WHITE : 'grey'}
                  />
                )}
                label={screen.label}
                onPress={() => {
                  handleNavigation(screen.screen, screen.label);
                }}
                labelStyle={{
                  fontSize: FONT_SIZES.MEDIUM,
                  color: isLabel(screen.label) ? COLORS.WHITE : COLORS.BLACK,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.authButtonCon}>
        {currentUser && currentUser?.email ? (
          <TouchableOpacity
            style={{...styles.authBut, top: 30}}
            onPress={handleSignOut}>
            <AntDesign name="logout" size={wp('4.4%')} color="grey" />
            <Text style={styles.authText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.authBut}
              onPress={() => handleNavigation(screenNames.signIn, 'Home')}>
              <MaterialCommunityIcons
                name="import"
                size={wp('4.4%')}
                color="grey"
              />
              <Text style={styles.authText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.authBut, top: 20}}
              onPress={() => handleNavigation(screenNames.signUp, 'Home')}>
              <Feather name="user-plus" size={wp('4.4%')} color="grey" />
              <Text style={styles.authText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;
