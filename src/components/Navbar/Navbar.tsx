import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useCartState} from '../../hook/useCart';
import {fetchAllChat} from '../../actions/chatActions';
import {
  messageNotificationForCustomer,
  useAllChatState,
} from '../../hook/useChat';
import {useUserState} from '../../hook/useUsers';
import {useEffect} from 'react';
import {NavigationProps, RootStackParamList, screenNames} from '../../screen';
import {navbarStyles} from './navbarStyles';
import {useGlobalState, GlobalStateProps} from '../../hook/useGlobal';
import themes from '../../config/themes';

const NavbarIcons = ({search}: {search?: boolean}) => {
  fetchAllChat();
  const navigation = useNavigation<NavigationProps>();
  const {cartItems} = useCartState();
  const {setGlobalState} = useGlobalState();
  const {setUser, currentUser, isUserLoading} = useUserState();
  const {allChat} = useAllChatState();

  const validRouteNames: (keyof RootStackParamList)[] = [
    screenNames.productDetail,
    screenNames.cart,
    screenNames.productList,
    screenNames.settingsStack,
    screenNames.chat,
  ];

  useEffect(() => {
    if (!currentUser?.email && !isUserLoading) {
      const unsubscribe = navigation.addListener('state', event => {
        const currentState = event.data.state;

        const getCurrentScreen = event.data.state.routes[currentState.index];

        if (getCurrentScreen) {
          const screenName = getCurrentScreen.name;

          if (validRouteNames.includes(screenName)) {
            setUser(prev => ({
              ...prev,
              previousRoute: screenName,
            }));
          }
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [navigation, currentUser, isUserLoading]);
  const extractUnreadMessage = messageNotificationForCustomer(
    currentUser?.userId || '',
    allChat,
  );
  const hasNewMessage = extractUnreadMessage.length > 0;
  const cartHasItems = cartItems.length > 0;

  return (
    <View style={navbarStyles.container}>
      {search ? (
        <TouchableOpacity
          onPress={() => {
            setGlobalState((prev: GlobalStateProps) => ({
              ...prev,
              searchTitle: screenNames.search,
            }));
            navigation.navigate(screenNames.search, {category: ''});
          }}>
          <AntDesign name="search1" size={themes.ICONS.SMALL} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.chat)}
          style={{flexDirection: 'row', position: 'relative'}}>
          <Ionicons
            name="chatbubbles-outline"
            size={themes.ICONS.SMALL}
            color={themes.COLORS.MUTED}
          />
          {hasNewMessage && <View style={navbarStyles.indicator} />}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.cart)}
        style={{flexDirection: 'row', position: 'relative'}}>
        <FontAwesome
          name="shopping-cart"
          size={themes.ICONS.SMALL}
          color="grey"
        />
        {cartHasItems && <View style={navbarStyles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default NavbarIcons;
