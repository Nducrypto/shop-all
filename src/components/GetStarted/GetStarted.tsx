import React from 'react';
import {View, ImageBackground, Text, StatusBar} from 'react-native';
import CustomButton from '../CustomButton/CustomButton.tsx';
import {getStartedStorageKey, wp} from '../../config/appConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useGetStarted,
  GetStarted as Started,
} from '../../hook/useGetStarted.ts';
import {getStartedStyles} from './getStartedStyles.ts';

const GetStarted = () => {
  const {setGetStarted} = useGetStarted();

  const handleGetStarted = async () => {
    try {
      setGetStarted((prev: Started) => ({
        ...prev,
        hasUserVisitedBefore: true,
      }));
      AsyncStorage.setItem(
        getStartedStorageKey,
        JSON.stringify('This user has visied'),
      );
    } catch (error) {}
    throw new Error('failed to update get Started');
  };

  return (
    <ImageBackground
      source={require('../../../assets/man-shop.png')}
      style={getStartedStyles.background}
      imageStyle={getStartedStyles.imageStyle}
      resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={getStartedStyles.container}>
        <Text style={getStartedStyles.text}>Welcome to shopeall</Text>
        <Text style={getStartedStyles.desc}>
          Your ultimate shopping destination
        </Text>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={getStartedStyles.button}>
          <CustomButton
            title="GET STARTED"
            width={wp('80%')}
            onPress={() => handleGetStarted()}
            testID="get-started-button"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;
