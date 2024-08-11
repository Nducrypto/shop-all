import React from 'react';
import {
  ScrollView,
  Image,
  ImageBackground,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useProductState} from '../../hook/useProduct';
import {useUserState} from '../../hook/useUsers';
import {
  messageNotificationForCustomer,
  useAllChatState,
} from '../../hook/useChat';
import {useOrderState, userOrdersHistory} from '../../hook/useOrder';
import {getAllOrders} from '../../actions/orderActions';
import {NavigationProps, screenNames} from '../../screen';
import {useGlobalState} from '../../hook/useGlobal';
import {useAuthentication} from '../../actions/usersAction';
import {profileStyles} from './profileStyles';
import themes from '../../config/themes';

const Profile = () => {
  useAuthentication();
  getAllOrders();
  const navigation = useNavigation<NavigationProps>();
  const {isProductLoading} = useProductState();
  const {currentUser} = useUserState();
  const {recentlyViewed} = useGlobalState();

  const {allChat} = useAllChatState();
  const extractUnreadMessage = messageNotificationForCustomer(
    currentUser?.userId || '',
    allChat,
  );

  const {isOrderLoading} = useOrderState();
  const totalOrders = userOrdersHistory(currentUser?.email || '').length;

  const unreadMessageLength = extractUnreadMessage.length;

  return (
    <View style={profileStyles.profile}>
      <View style={profileStyles.profileContainer}>
        {currentUser?.profilePic ? (
          <ImageBackground
            source={{uri: currentUser?.profilePic}}
            style={profileStyles.profileContainer}
            imageStyle={profileStyles.profileImage}>
            <View style={profileStyles.profileDetails}>
              <View style={profileStyles.profileTexts}>
                <Text style={{paddingBottom: 8, fontSize: 20, color: 'white'}}>
                  {currentUser?.userName}
                </Text>
                <View style={profileStyles.nameAndLoCon}>
                  <View style={profileStyles.proCon}>
                    <View style={profileStyles.pro}>
                      <Text style={profileStyles.sharedText}>Pro</Text>
                    </View>
                    <Text style={profileStyles.seller}>
                      {currentUser?.role === 'Admin' ? 'Seller' : 'Buyer'}
                    </Text>
                    <Text style={profileStyles.iconCon}>
                      4.8 <AntDesign name="star" size={14} />
                    </Text>
                  </View>
                  {currentUser?.location && (
                    <View>
                      <Text
                        style={[
                          profileStyles.iconCon,
                          {color: themes.COLORS.MUTED},
                        ]}>
                        <FontAwesome
                          name="map-marker"
                          color={themes.COLORS.MUTED}
                          size={themes.ICONS.SMALL}
                        />{' '}
                        <Text>{currentUser?.location}</Text>
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                style={profileStyles.gradient}
              />
            </View>
          </ImageBackground>
        ) : (
          <View
            style={[
              profileStyles.profileContainer,
              {backgroundColor: themes.COLORS.DARKGREEN},
            ]}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={profileStyles.gradient}
            />
          </View>
        )}
      </View>

      <View style={profileStyles.options}>
        <View style={profileStyles.labelSection}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(screenNames.orders)}>
            <View style={profileStyles.labelCon}>
              <Text style={profileStyles.value}>
                {isOrderLoading ? (
                  <ActivityIndicator size="small" color="grey" />
                ) : (
                  totalOrders
                )}
              </Text>
              <Text style={profileStyles.label}>Orders</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <View style={profileStyles.labelCon}>
              <Text style={profileStyles.value}>0</Text>
              <Text style={profileStyles.label}>Bids & Offers</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            testID="message-label-button"
            onPress={() => navigation.navigate(screenNames.chat)}>
            <View style={profileStyles.labelCon}>
              <Text style={profileStyles.value}>{unreadMessageLength}</Text>
              <Text style={profileStyles.label}>Messages</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={profileStyles.viewLabelCon}>
          <Text style={profileStyles.recentlyViewedText}>Recently viewed</Text>
          <Text
            style={profileStyles.viewAllText}
            onPress={() => navigation.navigate(screenNames.homeStack)}>
            View All
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={profileStyles.recentlyViewed}>
          {recentlyViewed.slice(0, 6).map((item, imgIndex) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate(screenNames.productDetail, {
                  ...item,
                })
              }
              key={`viewed-${imgIndex}`}>
              <Image
                source={{uri: item.image[0]}}
                resizeMode="cover"
                style={profileStyles.thumb}
                testID={`index${imgIndex}`}
              />
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
