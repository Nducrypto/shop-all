import React, {useEffect, useState} from 'react';
import {
  ListRenderItem,
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
import {payment, privacy, recommended, ITEMPROPS} from './settingsData';
import {useUserState} from '../../hook/useUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateFaceIdStatus} from '../../actions/usersAction';
import * as biometric from '../../utils/biometrics';
import {settingStyles} from './settingStyles';
import {DynamicNavigationProps} from '../../screen';
import themes from '../../config/themes';

function Settings() {
  const [switchState, setSwitchState] = useState<Record<string, boolean>>({});
  const {currentUser} = useUserState();
  const {navigate} = useNavigation<DynamicNavigationProps>();

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

  useEffect(() => {
    const checkIfBiometricsIsDisbaledAndDeleteKey = async () => {
      try {
        const isAvailable = await biometric.checkBiometrics();
        if (!isAvailable) {
          const areKeysPresent = await biometric.checkIfBiometricKeysExist();

          if (areKeysPresent) {
            await disableBiometrics();
          }
        }
        return;
      } catch (error) {
        console.error('Error checking or disabling biometrics:', error);
      }
    };

    checkIfBiometricsIsDisbaledAndDeleteKey();
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
    const isAvailable = await biometric.checkBiometrics();
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
                  disableBiometrics();
                } else {
                  enableBiometrics();
                }
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

  async function enableBiometrics() {
    setSwitchState(prev => ({
      ...prev,
      face: true,
    }));
    const publicKey = await biometric.generateBiometricPublicKey();
    await updateFaceIdStatus(currentUser?.userId ?? '', publicKey);
    await AsyncStorage.setItem(
      'shopeEaseFaceId',
      JSON.stringify({
        userId: currentUser?.userId,
        key: publicKey,
      }),
    );
  }
  async function disableBiometrics() {
    setSwitchState(prev => ({
      ...prev,
      face: false,
    }));
    await biometric.deleteBiometricPublicKey();
    await updateFaceIdStatus(currentUser?.userId ?? '', '');
    AsyncStorage.removeItem('shopeEaseFaceId');
  }

  const renderItem: ListRenderItem<ITEMPROPS> = ({item}) => {
    switch (item.type) {
      case 'switch':
        return (
          <View style={settingStyles.titleAndSwiCon}>
            <Text style={settingStyles.sharedText}>{item.title}</Text>

            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              ios_backgroundColor={themes.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === 'android' ? themes.COLORS?.SWITCH_OFF : ''
              }
              trackColor={{
                false: themes.COLORS.SWITCH_OFF,
                true: themes.COLORS.SWITCH_ON,
              }}
              testID={`switch${item.id}`}
              value={switchState[item.id]}
            />
          </View>
        );
      case 'button':
        return (
          <View style={settingStyles.rows}>
            <TouchableOpacity onPress={() => navigate(item.screen)}>
              <View
                style={{
                  paddingTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={settingStyles.sharedText}>{item.title}</Text>
                <FontAwesome
                  name="angle-right"
                  style={{paddingRight: 5}}
                  size={themes.ICONS.MEDIUM}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const Section = ({header, data}: {header: string; data: ITEMPROPS[]}) => (
    <View style={settingStyles.titleCon}>
      <Text style={settingStyles.headerLabel}>{header}</Text>
      <Text style={settingStyles.subHeaderLabel}>
        {header === 'Recommended Settings'
          ? 'These are the most important settings'
          : header === 'Payment Settings'
          ? 'These are also important settings'
          : 'Third most important settings'}
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={settingStyles.settings}
      />
    </View>
  );
  return (
    <View>
      <View style={settingStyles.content}>
        <Section header="Recommended Settings" data={recommended} />
        <Section header="Payment Settings" data={payment} />
        <Section header="Privacy Settings" data={privacy} />
      </View>
    </View>
  );
}
export default Settings;
