import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';

export const navbarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 20,
    gap: 20,
  },
  size: {
    height: hp('2.3%'),
  },
  indicator: {
    height: hp('1%'),
    width: wp('1.9%'),
    backgroundColor: 'red',
    borderRadius: hp('50%'),
    left: -5,
  },
});
