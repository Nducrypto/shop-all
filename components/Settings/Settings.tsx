import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {payment, privacy, recommended} from './settingsData';
import globalStyle from '../../constants/globalStyle';
import {useUserState} from '../recoilState/userState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateFaceIdStatus} from '../../actions/usersAction';
import {
  checkBiometrics,
  deleteBiometricPublicKey,
  generateBiometricPublicKey,
} from '../../constants/biometricsUtils';

function Settings() {
  const [switchState, setSwitchState] = useState<Record<string, boolean>>({});
  const {currentUser} = useUserState();
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    const loadSettingsDataFromStorage = async () => {
      try {
        const [faceId, autoLock] = await Promise.all([
          AsyncStorage.getItem('shopeEaseFaceId'),
          AsyncStorage.getItem('shopeEaseAutoLock'),
        ]);

        setSwitchState({
          face: faceId !== null,
          autoLock: autoLock !== null,
        });
      } catch (error) {
        Alert.alert('Failed to load settings from storage:');
      }
    };

    loadSettingsDataFromStorage();
  }, []);

  function toggleSwitch(id: string) {
    if (id === 'face') {
      handleFaceIdToggle();
    } else if (id === 'autoLock') {
      handleAutoLockToggle();
    }
  }
  const handleAutoLockToggle = async () => {
    const newStatus = !switchState.autoLock;
    setSwitchState(prev => ({...prev, autoLock: newStatus}));

    try {
      if (newStatus) {
        await AsyncStorage.setItem('shopeEaseAutoLock', JSON.stringify(true));
      } else {
        await AsyncStorage.removeItem('shopeEaseAutoLock');
      }
    } catch (error) {}
  };
  async function handleFaceIdToggle() {
    const isAvailable = await checkBiometrics();
    if (!isAvailable) {
      Alert.alert(
        'Biometrics Not Enrolled',
        'No biometrics are enrolled on this device. Please go to your device settings and enroll biometrics.',
        [{text: 'OK'}],
      );
      return;
    }
    if (isAvailable) {
      Alert.alert(
        'Face ID',
        switchState.face
          ? 'Disable Face ID authentication?'
          : 'Enable Face ID authentication?',
        [
          {
            text: 'Yes',
            onPress: async () => {
              try {
                if (switchState.face) {
                  await deleteBiometricPublicKey();
                  await updateFaceIdStatus(currentUser?.userId ?? '', '');
                  await AsyncStorage.removeItem('shopeEaseFaceId');
                } else {
                  const publicKey = await generateBiometricPublicKey();
                  await updateFaceIdStatus(
                    currentUser?.userId ?? '',
                    publicKey,
                  );
                  await AsyncStorage.setItem(
                    'shopeEaseFaceId',
                    JSON.stringify({
                      userId: currentUser?.userId,
                      key: publicKey,
                    }),
                  );
                }
                setSwitchState(prev => ({
                  ...prev,
                  face: !switchState.face,
                }));
              } catch (error) {
                Alert.alert('Failed to update Face ID setting');
              }
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }
  }
  interface ITEM {
    title: string;
    id: string;
    type: string;
    screen: string;
  }

  const renderItem = ({item}: {item: ITEM}) => {
    switch (item.type) {
      case 'switch':
        return (
          <View style={styles.titleAndSwiCon}>
            <Text style={{fontSize: 14}}>{item.title}</Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              ios_backgroundColor={globalStyle.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === 'android' ? globalStyle?.COLORS?.SWITCH_OFF : ''
              }
              trackColor={{
                false: globalStyle.COLORS.SWITCH_OFF,
                true: globalStyle.COLORS.SWITCH_ON,
              }}
              testID={`switch${item.id}`}
              value={switchState[item.id]}
            />
          </View>
        );
      case 'button':
        return (
          <View style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.screen)}>
              <View
                style={{
                  paddingTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14}}>{item.title}</Text>
                <FontAwesome
                  name="angle-right"
                  style={{paddingRight: 5}}
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        break;
    }
  };

  const Section = ({header, data}: {header: string; data: any[]}) => (
    <View style={styles.titleCon}>
      <Text style={styles.headerLabel}>{header}</Text>
      <Text style={{fontSize: 12, textAlign: 'center'}}>
        {header === 'Recommended Settings'
          ? 'These are the most important settings'
          : header === 'Payment Settings'
          ? 'These are also important settings'
          : 'Third most important settings'}
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      />
    </View>
  );
  return (
    <View>
      <Section header="Recommended Settings" data={recommended} />
      <Section header="Payment Settings" data={payment} />
      <Section header="Privacy Settings" data={privacy} />
    </View>
  );
}
export default Settings;
const styles = StyleSheet.create({
  settings: {
    paddingVertical: 15,
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  titleCon: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleAndSwiCon: {
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rows: {
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 2,
  },
});
