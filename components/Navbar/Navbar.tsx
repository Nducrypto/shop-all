import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useCartState} from '../recoilState/cartState';
import {fetchAllChat} from '../../actions/chatActions';
import {
  messageNotificationForCustomer,
  useAllChatState,
} from '../recoilState/chatState';
import {useUserState} from '../recoilState/userState';
import {useEffect} from 'react';
import {screen} from '../../constants/screens';
import globalStyle from '../../constants/globalStyle';

const NavbarIcons = ({search}: {search?: boolean}) => {
  fetchAllChat();
  const navigation = useNavigation<any>();
  const {cartItems} = useCartState();
  const {setUser, currentUser, isUserLoading} = useUserState();
  const {allChat} = useAllChatState();
  const validRouteNames = [
    screen.productDetail,
    screen.cart,
    screen.productList,
    screen.settingsStack,
    screen.chat,
  ];

  useEffect(() => {
    if (!currentUser?.email && !isUserLoading) {
      const unsubscribe = navigation.addListener('state', (event: any) => {
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
  const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {search ? (
        <TouchableOpacity onPress={() => navigation.navigate(screen.search)}>
          <AntDesign name="search1" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleNavigate(screen.chat)}
          style={{flexDirection: 'row', position: 'relative'}}>
          <Ionicons
            name="chatbubbles-outline"
            size={20}
            color={globalStyle.COLORS.MUTED}
          />
          {hasNewMessage && (
            <View
              style={{
                height: 7,
                width: 7,
                backgroundColor: 'red',
                borderRadius: 50,
                left: -5,
              }}
            />
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => handleNavigate(screen.cart)}
        style={{flexDirection: 'row', position: 'relative'}}>
        <FontAwesome name="shopping-cart" size={18} color="grey" />
        {cartHasItems && (
          <View
            style={{
              height: 7,
              width: 7,
              backgroundColor: 'red',
              borderRadius: 50,
              left: -5,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NavbarIcons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 20,
    gap: 20,
  },
});
