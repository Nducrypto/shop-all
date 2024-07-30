import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch, Platform} from 'react-native';
import globalStyle from '../../constants/globalStyle';

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
      <View style={styles.titleCon}>
        <Text style={styles.headerLabel}>Notifications Settings</Text>
        <Text style={styles.desc}>These are the most important settings</Text>
      </View>
      <View style={styles.titleAndSwiCon}>
        <Text style={styles.label}>Someone mentions me</Text>
        <Switch
          onValueChange={() => toggleSwitch('mention')}
          ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: globalStyle.COLORS.SWITCH_OFF,
            true: globalStyle.COLORS.SWITCH_ON,
          }}
          value={isMentionNotificationEnabled}
        />
      </View>
      <View style={styles.titleAndSwiCon}>
        <Text style={styles.label}>Anyone follows me</Text>
        <Switch
          onValueChange={() => toggleSwitch('follow')}
          ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: globalStyle.COLORS.SWITCH_OFF,
            true: globalStyle.COLORS.SWITCH_ON,
          }}
          value={isFollowNotificationEnabled}
        />
      </View>
      <View style={styles.titleAndSwiCon}>
        <Text style={styles.label}>Someone comments me</Text>
        <Switch
          onValueChange={() => toggleSwitch('comment')}
          ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: globalStyle.COLORS.SWITCH_OFF,
            true: globalStyle.COLORS.SWITCH_ON,
          }}
          value={isCommentNotificationEnabled}
        />
      </View>
      <View style={styles.titleAndSwiCon}>
        <Text style={styles.label}>A seller follows me</Text>
        <Switch
          onValueChange={() => toggleSwitch('sellerFollow')}
          ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
          thumbColor={
            Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
          }
          trackColor={{
            false: globalStyle.COLORS.SWITCH_OFF,
            true: globalStyle.COLORS.SWITCH_ON,
          }}
          value={isSellerFollowNotificationEnabled}
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  settings: {
    paddingVertical: 15,
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  titleCon: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleAndSwiCon: {
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  rows: {
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});
