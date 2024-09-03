import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp} from '../../config/appConfig';

export const giftCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    color: themes.COLORS.BLACK,
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  message: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
});
