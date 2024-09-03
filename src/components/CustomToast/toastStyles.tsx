import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const styles = StyleSheet.create({
  successCon: {
    height: hp('6%'),
    width: wp('95%'),
    padding: 10,
    borderRadius: 5,
    backgroundColor: themes.COLORS.DARKGREEN,
  },
  errorCon: {
    height: hp('9%'),
    width: wp('95%'),
    padding: 10,
    borderRadius: 20,
    backgroundColor: themes.COLORS.ERROR,
  },
  text: {
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.SMALL,
  },
});
