import {StyleSheet} from 'react-native';
import {wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const bestDealStyles = StyleSheet.create({
  home: {
    width: themes.SIZES.FULLWIDTH,
    flex: 1,
  },

  productsContainer: {
    width: wp('96%'),
    paddingVertical: 32,
  },
});
