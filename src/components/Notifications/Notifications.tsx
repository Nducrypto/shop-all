import React, {useState} from 'react';
import {Text, View, Switch, Platform} from 'react-native';

import {notificationStyles} from './notificationsStyles';
import themes from '../../config/themes';

const Notifications = () => {
  const [isMentionNotificationEnabled, setIsMentionNotificationEnabled] =
    useState<boolean>(false);
  const [isFollowNotificationEnabled, setIsFollowNotificationEnabled] =
    useState<boolean>(false);
  const [isCommentNotificationEnabled, setIsCommentNotificationEnabled] =
    useState<boolean>(false);
  const [
    isSellerFollowNotificationEnabled,
    setIsSellerFollowNotificationEnabled,
  ] = useState<boolean>(false);

  const toggleSwitch = (switchType: string) => {
    switch (switchType) {
      case 'mention':
        setIsMentionNotificationEnabled(previousState => !previousState);
        break;
      case 'follow':
        setIsFollowNotificationEnabled(previousState => !previousState);
        break;
      case 'comment':
        setIsCommentNotificationEnabled(previousState => !previousState);
        break;
      case 'sellerFollow':
        setIsSellerFollowNotificationEnabled(previousState => !previousState);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <View style={notificationStyles.titleCon}>
        <Text style={notificationStyles.headerLabel}>
          Notifications Settings
        </Text>
        <Text style={notificationStyles.desc}>
          These are the most important settings
        </Text>
      </View>
      <View style={notificationStyles.titleAndSwiCon}>
        <Text style={notificationStyles.label}>Someone mentions me</Text>
        <Switch
          onValueChange={() => toggleSwitch('mention')}
          ios_backgroundColor={themes.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? themes?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: themes.COLORS.SWITCH_OFF,
            true: themes.COLORS.SWITCH_ON,
          }}
          value={isMentionNotificationEnabled}
        />
      </View>
      <View style={notificationStyles.titleAndSwiCon}>
        <Text style={notificationStyles.label}>Anyone follows me</Text>
        <Switch
          onValueChange={() => toggleSwitch('follow')}
          ios_backgroundColor={themes.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? themes?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: themes.COLORS.SWITCH_OFF,
            true: themes.COLORS.SWITCH_ON,
          }}
          value={isFollowNotificationEnabled}
        />
      </View>
      <View style={notificationStyles.titleAndSwiCon}>
        <Text style={notificationStyles.label}>Someone comments me</Text>
        <Switch
          onValueChange={() => toggleSwitch('comment')}
          ios_backgroundColor={themes.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? themes.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: themes.COLORS.SWITCH_OFF,
            true: themes.COLORS.SWITCH_ON,
          }}
          value={isCommentNotificationEnabled}
        />
      </View>
      <View style={notificationStyles.titleAndSwiCon}>
        <Text style={notificationStyles.label}>A seller follows me</Text>
        <Switch
          onValueChange={() => toggleSwitch('sellerFollow')}
          ios_backgroundColor={themes.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? themes?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: themes.COLORS.SWITCH_OFF,
            true: themes.COLORS.SWITCH_ON,
          }}
          value={isSellerFollowNotificationEnabled}
        />
      </View>
    </View>
  );
};

export default Notifications;
