import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../src/config/appConfig';
import themes from '../../config/themes';

export const authStyles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    backgroundColor: themes.COLORS.DARKGREEN,
    padding: 20,
  },

  iconsCon: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: hp('12%'),
  },

  forgPass: {
    color: themes.COLORS.WHITE,
    textAlign: 'right',
    marginTop: hp('4%'),
    fontWeight: '500',
  },
  sharedText: {
    color: themes.COLORS.WHITE,
    textAlign: 'center',
    marginTop: hp('4%'),
  },
  sharedCon: {
    textAlign: 'center',
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.MEDIUM,
    marginTop: hp('6%'),
  },
  faceIdBtn: {
    width: wp('45%'),
    alignSelf: 'center',
    padding: 6,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  faceIdText: {
    color: themes.COLORS.WHITE,
    marginTop: 10,
    fontSize: themes.FONT_SIZES.SMALL,
  },
});
