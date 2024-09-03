import {StyleSheet} from 'react-native';
import {wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const searchStyles = StyleSheet.create({
  home: {
    flex: 1,
    width: themes.SIZES.FULLWIDTH,
    paddingBottom: 10,
  },

  products: {
    width: wp('94%'),
    paddingVertical: 16,
  },
});
